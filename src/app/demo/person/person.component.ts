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
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<PersonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.title = data.title;
              }

  ngOnInit(): void {
    this.form = this.fb.group({
      'first': [this.data.first, Validators.required ],
      'last': [this.data.last, Validators.required ],
      'email': [this.data.email, Validators.required ],
      'phone': [this.data.phone, Validators.required ],
    });
  }

  onReset(data) {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    console.log('reset: ' + JSON.stringify(this.form.value));
  }

  onSubmit(data) {
    console.log('saved: ' + JSON.stringify(this.form.value));
    this.dialogRef.close();
  }

}
