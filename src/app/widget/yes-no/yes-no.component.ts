import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { YesNoModel } from 'src/app/model/yes-no-model';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss'],
})
export class YesNoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<YesNoComponent>, @Inject(MAT_DIALOG_DATA) public data: YesNoModel) { }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void{
    this.dialogRef.close(true);
  }

}
