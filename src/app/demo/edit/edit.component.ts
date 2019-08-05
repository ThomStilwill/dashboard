import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;

  makes = {
    ford: 'Ford',
    chevy: 'Chevrolet',
    dodge: 'Dodge'
    };

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['James', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(12)
                ]],
      description: ['The real captain.', Validators.required],
      date: [new Date('8/26/1998'), Validators.required],
      enddate: [new Date('8/26/1998'), Validators.required],
      make: ['', Validators.required],
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
