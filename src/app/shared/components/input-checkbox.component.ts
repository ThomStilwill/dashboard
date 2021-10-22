import { MatCheckbox } from '@angular/material/checkbox';
import { Component, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, AbstractControl, ControlValueAccessor, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form-service';

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
  private subscriptions = new Subscription();
  @Input() formControlName: string;
  @Input() readonly = false;
  @Input() label: string;

  @ViewChild(MatCheckbox, {static: false}) matCheckbox: MatCheckbox;

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
