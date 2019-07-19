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
  @Output() submitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  submitted = false;
  debug = false;

  constructor() { }

  ngOnInit() {
  }

  submit(data) {
    this.submitted = true;
    if (!this.formGroup.valid) {
      return;
    }
    this.submitEvent.emit(data);
  }

  cancel(data) {
    this.cancelEvent.emit(data);
  }

}
