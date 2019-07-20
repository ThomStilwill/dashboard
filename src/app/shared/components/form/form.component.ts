import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from 'events';

@Component({
  selector: 'edit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() title: string;
  @Input() debug = false;
  @Output() submitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.submitted = true;

    if (!this.formGroup.valid) {
      return;
    }
    this.submitEvent.emit(this.formGroup.value);
  }

  cancel(data) {
    this.cancelEvent.emit(data);
  }

}
