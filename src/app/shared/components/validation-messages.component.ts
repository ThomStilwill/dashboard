import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'validation-messages',
  templateUrl: './validation-messages.component.html'
})
export class ValidationMessagesComponent implements OnInit {

  @Input() validationMessages: object;
  @Input() label: string;
  @Input() controlName: string;
  @Input() control: AbstractControl;
  @Input() form;

  private defaultMessages: object;
  messages: {};
  keys: string[];

  constructor() {  }

  ngOnInit() {
    const controlMessages = this.validationMessages[this.controlName] || {};

    this.defaultMessages = {
      required: `${this.label} is required.`,
      pattern:  `${this.label} is invalid.`,
      minlength:  `${this.label} is too short.`,
      maxlength:  `${this.label} is too long.`
    };

    const messages = {...this.defaultMessages, ...controlMessages};

    if (messages) {
      this.messages = messages;
      this.keys = Object.keys(this.messages);
    }
  }
}
