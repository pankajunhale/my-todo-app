import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, zip, combineLatest, Subject } from 'rxjs';
import { CardModel } from '../model/card-model';
import { CardListModel } from '../model/card-list-model';
import { ServiceBase } from '../model/service-base';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends ServiceBase {


  constructor(private httpClient: HttpClient) {
    super();
  }

  findAll() {
    return this.httpClient.get(this.BASE_API_PATH_TODO);
  }

  findCardById(id: number) {
    return this.httpClient.get(`${this.BASE_API_PATH_TODO}/${id}`);
  }

  createList(name: string) {
    const model = new CardListModel(name);
    return this.httpClient.post(`${this.BASE_API_PATH_TODO}`, model);
  }

  createCard(model: CardListModel) {
    return this.httpClient.post(`${this.BASE_API_PATH_TODO}`, model);
  }

  removeList(id: number) {
    return this.httpClient.delete(`${this.BASE_API_PATH_TODO}/${id}`);
  }

  removeCard(model: CardListModel) {
    return this.httpClient.put(`${this.BASE_API_PATH_TODO}`, model);
  }

  findListById(id: number, list: CardListModel[]) {
    const model: CardListModel = list.find((item: CardListModel) => {
      return (item.id === id);
    });
    return model;
  }

  tranferCard(list: CardListModel[], containerId: number, previousContainerId: number, sourceList: any, destinationList: any) {
    const oldSourceList = this.findListById(previousContainerId, list);
    const oldDestinationList = this.findListById(containerId, list);
    // reset all card list
    // source
    // if (oldSourceList && oldSourceList.toDoList) {
    //   oldSourceList.toDoList.length = 0;
    //   sourceList.forEach((element: CardModel) => {
    //     oldSourceList.toDoList.push(new CardModel(element.name));
    //   });
    // }

    // destination
    // if (oldDestinationList && oldDestinationList.toDoList) {
    //   oldDestinationList.toDoList.length = 0;
    //   destinationList.forEach((element: CardModel) => {
    //     oldDestinationList.toDoList.push(new CardModel(element.name));
    //   });
    // }

    return forkJoin([this.createCard(oldSourceList), this.removeCard(oldDestinationList)]);
  }

}
