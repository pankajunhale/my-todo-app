import { CardModel } from './card-model';

export class CardListModel {
    id: number;
    name: string;
    toDoList: Array<CardModel> = new Array<CardModel>();
    constructor(name: string, card?: CardModel) {
        this.id = new Date().getTime();
        this.name = name || '';
        if (card) {
            this.toDoList.push(card);
        }
    }
}
