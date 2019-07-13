import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-linkedit',
  templateUrl: './linkedit.component.html',
  styleUrls: ['./linkedit.component.scss']
})
export class LinkeditComponent implements OnInit {

  @Output() submitted = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: [''],
      href: ['']
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted.emit(this.form.value);
  }

  onCancel() {
    this.cancelled.emit();
  }
}
