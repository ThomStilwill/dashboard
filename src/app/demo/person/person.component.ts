import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  form: FormGroup;
  title: string;
  model: any;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<PersonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.title = data.title;
                this.model = data.model;
              }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      'first': [this.model.first, Validators.required ],
      'last': [this.model.last, Validators.required ],
      'email': [this.model.email, Validators.required ],
      'phone': [this.model.phone, Validators.required ],
      'note': [this.model.note, Validators.required ],
      'description': [this.model.description, Validators.required ],
    });
  }

  onReset(data) {
    this.initForm();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    console.log('reset: ' + JSON.stringify(data));
  }

  onSubmit(data) {
    console.log('saved: ' + JSON.stringify(data));
    this.dialogRef.close(data);
  }
}
