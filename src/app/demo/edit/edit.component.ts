import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '../../shared/components/select-item';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;

  makes: SelectItem[] = [
    {value: 'ford', viewValue: 'Ford'},
    {value: 'chevy', viewValue: 'Chevrolet'},
    {value: 'dodge', viewValue: 'Dodge'},
  ];

  types = {
    mc : 'Motorcycle',
    car: 'Automobile',
    truck: 'Truck'
  };

  constructor(private fb: FormBuilder, private dialog: MatDialog) {

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

  showDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onReset(data) {
    this.form.reset();
    this.initModel();
    this.form.markAsPristine();
    this.form.markAsUntouched();

    console.log('reset: ' + JSON.stringify(this.form.value));
  }

  onSubmit(data) {
    console.log('saved: ' + JSON.stringify(this.form.value));
  }

}
