import { MatCheckbox } from '@angular/material';
import { Component, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, AbstractControl, ControlValueAccessor, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'input-checkbox',
  templateUrl: './input-checkbox.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective}],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCheckboxComponent),
    multi: true
  }]
})

export class InputCheckboxComponent implements OnInit, ControlValueAccessor {

  @Input() formControlName: string;
  @Input() label: string;
  @ViewChild(MatCheckbox, {static: false}) matCheckbox: MatCheckbox;

  valuefield: any = null;
  control: AbstractControl;

  constructor(protected controlContainer: ControlContainer) {}

  get value(): any {
    return this.valuefield;
  }

  set value(v: any) {
    if (v !== this.valuefield) {
      this.valuefield = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this.valuefield = value;
    this.onChange(value);
  }

  onChange = (_) => {};
  onTouched = () => {};

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    if (this.controlContainer) {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        } else {
            console.warn('Missing FormControlName');
        }
    } else {
        console.warn('Missing FormControlName');
    }
  }

}
