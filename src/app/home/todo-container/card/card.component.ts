import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CardComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required])
    });
  }

  onConfirm(): void {
    const result = {
      action: this.data.type,
      data: this.form.value
    }
    this.dialogRef.close(result);
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
}

