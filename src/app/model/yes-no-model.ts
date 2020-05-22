export class YesNoModel {
    header = '';
    content = '';
    yesButtonText = '';
    noButtonText = '';
    constructor(header: string, content: string, yesButton?: string, noButton?: string) {
        this.header = header;
        this.content = content;
        this.yesButtonText = yesButton ? yesButton : 'Yes';
        this.noButtonText = noButton ? noButton : 'No';
    }
}
