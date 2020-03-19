import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'edit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {

  parentSubject = new Subject();

  @Input() formGroup: FormGroup;
  @Input() title: string;
  @Input() debug = false;
  @Input() readonly = false;
  @Output() submitForm = new EventEmitter();
  @Output() resetForm = new EventEmitter();

  submitted = false;

  constructor(private formService: FormService) { }

  ngOnInit() {  }

  setState() {
    this.readonly = !this.readonly;
    this.formService.setState(this.readonly ? 'Read' : 'Edit');
  }

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
