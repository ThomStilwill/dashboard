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
  @Input() item;

  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: [''],
      href: ['']
    });
   }

  ngOnInit() {
    const title = this.item && this.item.title || '';
    const href = this.item && this.item.href || '';
    this.form.controls.title.setValue(title);
    this.form.controls.href.setValue(href);
  }

  onSubmit() {
    this.submitted.emit(this.form.value);
  }

  onCancel() {
    this.cancelled.emit();
  }
}
