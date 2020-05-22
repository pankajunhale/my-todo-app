import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todo.service';
import { CardListViewModel } from 'src/app/view-model/card-list-view-model';
import { CardListModel } from 'src/app/model/card-list-model';
import { CardModel } from 'src/app/model/card-model';
import { YesNoComponent } from 'src/app/widget/yes-no/yes-no.component';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
})
export class TodoContainerComponent implements OnInit {
  vm = new CardListViewModel();
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private service: TodoService, public dialog: MatDialog) {
    this.myForm = this.fb.group({
      name: new FormControl('dfd', [Validators.required])
    });
  }

  ngOnInit() {
    this.init();
  }

  private bindAll() {
    this.service.findAll().subscribe((response: Array<CardListModel>) => {
      this.vm.cardListModel.length = 0;
      this.vm.cardListModel = response;
      console.log('All', this.vm.cardListModel);
    }, (error) => {
    })
  }

  private init() {
    this.bindAll();
  }
  createList(name: string) {
    this.service.createList(name).subscribe((response) => {
      this.bindAll();
    }, (error) => {
    })
  }

  addCard(listItem: CardListModel, cardName: string) {
    const card = new CardModel(cardName);
    const model = this.vm.cardListModel.find((item) => (item.id === listItem.id));
    model.toDoList.push(card);
    this.service.createCard(model).subscribe((response) => {
    }, (error) => {
    })
  }

  removeList(id: number) {
    this.service.removeList(id).subscribe((response) => {
      this.bindAll();
    }, (error) => {
    })
  }

  removeCard(listId: number, cardId: number) {
    const model: CardListModel = this.vm.cardListModel.find((item: CardListModel) => {
      return (item.id === listId);
    });
    const cardModelList = model.toDoList.filter((item: CardModel) => {
      return (item.id !== cardId);
    });

    model.toDoList = cardModelList;
    this.service.removeCard(model).subscribe((response) => {
      // console.log('List', response);
      this.bindAll();
    }, (error) => {
    })
  }

  drop(event: CdkDragDrop<string[]>, dragFrom: CardListModel) {
    try {
      console.log(event, event.container.id, event.previousContainer.id);
      if (event.previousContainer === event.container) {
        console.log('moveIn', event.container.data);
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      console.log('destination', event.container.data);
      console.log('source', event.previousContainer.data, dragFrom);
      this.service.tranferCard(this.vm.cardListModel, parseInt(event.container.id, 0), parseInt(event.previousContainer.id, 0),
        event.previousContainer.data, event.container.data).subscribe((response) => {
          this.bindAll();
        });
    } catch (error) {
      throw new Error('Error in processing your request!');
    }
  }

  //
  openConfirmDialog(listId: number, cardId: number, actionType: string): void {
    const dialogRef = this.dialog.open(YesNoComponent, {
      width: '500px',
      data: this.vm.findYesNoConfiguration('Confirm delete', 'Are you sure? You want to delete the entry.')
    });

    dialogRef.afterClosed().subscribe(isRemoveCard => {
      if (actionType === 'REMOVE_LIST') {
        if (isRemoveCard) {
          this.removeList(listId);
        }
      }
      if (actionType === 'REMOVE_CARD') {
        if (isRemoveCard) {
          this.removeCard(listId, cardId);
        }
      }
    });
  }

  openAddDialog(actionType: string, listItem: CardListModel) {
    const dialogRef = this.dialog.open(CardComponent, {
      width: '500px',
      data: { type: actionType }
    });

    dialogRef.afterClosed().subscribe((obj: any) => {
      if (obj.action === 'ADD_LIST') {
        this.createList(obj.data.name);
      }
      if (obj.action === 'ADD_CARD') {
        this.addCard(listItem, obj.data.name);
      }
    });
  }
}



