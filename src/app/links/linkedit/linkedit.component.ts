import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LinkData } from '../models/LinkData';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-linkedit',
  templateUrl: './linkedit.component.html',
  styleUrls: ['./linkedit.component.scss']
})
export class LinkeditComponent implements OnInit {

  form: FormGroup;
  title: string;
  href: string;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<LinkeditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LinkData) {
    this.title = data.title;
    this.href = data.href;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, [Validators.required]],
      href: [this.href, [Validators.required]]
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }

}
