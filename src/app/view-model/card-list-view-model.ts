import { CardListModel } from '../model/card-list-model';
import { YesNoModel } from '../model/yes-no-model';

export class CardListViewModel {
    cardListModel: Array<CardListModel> = Array<CardListModel>();
    constructor() {
    }

    public findYesNoConfiguration(header: string, content: string, yesButton?: string, noButton?: string): YesNoModel {
        try {
            return new YesNoModel(header, content, yesButton, noButton);
        } catch (error) {
            throw new Error(error);
        }
    }
}
