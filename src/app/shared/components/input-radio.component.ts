import { MatRadioButton } from '@angular/material';
import { Component, Input, OnInit, ViewChild, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, AbstractControl, ControlValueAccessor, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form-service';

@Component({
  selector: 'input-radio',
  templateUrl: './input-radio.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective}],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputRadioComponent),
    multi: true
  }]
})

export class InputRadioComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private subscriptions = new Subscription();
  @Input() formControlName: string;
  @Input() label: string;
  @Input() hint: string;
  @Input() readonly = false;
  @Input() items;
  keys: string[];

  @ViewChild(MatRadioButton, {static: false}) matRadioButton: MatRadioButton;

  fieldvalue: any = null;
  control: AbstractControl;

  constructor(private controlContainer: ControlContainer,
              private formService: FormService) {}

  ngOnInit() {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
      this.subscriptions.add(this.formService.state$.subscribe(data => {
        console.log(data);
        this.readonly = data === 'Read';
      }));
    } else {
      console.warn('Missing FormControlName');
    }
    this.keys = Object.keys(this.items);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get value(): any {
    return this.fieldvalue;
  }

  set value(value: any) {
    if (value !== this.fieldvalue) {
      this.fieldvalue = value;
      this.onChange(value);
    }
  }

  onChange = (_) => {};
  onTouched = () => {};
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  writeValue(value: any) {
    this.fieldvalue = value;
    this.onChange(value);
  }

}
