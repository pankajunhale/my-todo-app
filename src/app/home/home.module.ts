import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomePage } from './home.page';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { TodoService } from '../services/todo.service';
import { YesNoComponent } from '../widget/yes-no/yes-no.component';

import {
  MatDialogModule,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { CardComponent } from './todo-container/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    IonicModule,
    DragDropModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, TodoContainerComponent],
  entryComponents: [],
  providers: [TodoService]
})
export class HomePageModule { }
