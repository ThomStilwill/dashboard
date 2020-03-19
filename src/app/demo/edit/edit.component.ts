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

  types = {
    mc : 'Motorcycle',
    car: 'Automobile',
    truck: 'Truck'
  };

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(12)
                ]],
      description: ['', Validators.required],
      date: [null, Validators.required],
      enddate: [null, Validators.required],
      make: ['', Validators.required],
      isCommercial: [false],
      type: [''],
      isReadOnly: [false]
    });

    this.initModel();
   }

  ngOnInit() {
  }

  initModel() {
    this.form.setValue(
      {
        name: 'James T Kirk',
        description: 'The real captain.',
        date: new Date('8/26/1998'),
        enddate: new Date('2/15/2017'),
        make: '',
        isCommercial: false,
        type: '',
        isReadOnly: true
      }
    );
  }

  onReset(data) {
    this.initModel();
    console.log('reset: ' + JSON.stringify(this.form.value));
  }

  onSubmit(data) {
    console.log('saved: ' + JSON.stringify(this.form.value));
  }

}
