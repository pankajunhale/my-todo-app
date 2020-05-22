export class CardModel {

    id: number;
    name: string;
    constructor(name: string) {
        this.id  = new Date().getTime();
        this.name = name || '';
    }
}
