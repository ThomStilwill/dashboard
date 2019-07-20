import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(12)
                ]],
      description: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
   }

  ngOnInit() {
  }

  onCancel(data) {
    console.log('cancelled');
  }

  onSubmit(data) {
    console.log('saved: ' + JSON.stringify(this.form.value));
  }

}
