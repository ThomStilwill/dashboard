import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  
  @Input() formGroup: FormGroup;
  title: string;
  @Output() submitForm = new EventEmitter();
  @Output() resetForm = new EventEmitter();
  submitted = false;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
  }

  ngOnInit(): void { }

  submit() {
    this.submitted = true;

    if (!this.formGroup.valid) {
      return;
    }
    this.submitForm.emit(this.formGroup.value);
  }

  reset() {
    this.resetForm.emit(this.formGroup.value);
  }
}
