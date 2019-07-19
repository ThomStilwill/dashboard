import { MatInput } from '@angular/material';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  forwardRef,
  Injector
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ControlContainer,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() formControlName: string;
  @Input() validationMessages: object = {};
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string;
  @Input() readonly = false;
  @Input() displayFunction: (value: any) => string = this.defaultDisplayFn;
  @ViewChild(MatInput, {static: false}) matInput: MatInput;

  valuefield: any = null;
  control: AbstractControl;

  constructor(private injector: Injector,
              private controlContainer: ControlContainer  ) { }

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.matInput.ngControl = this.injector.get(NgControl, null);
    });
  }

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

  onChange = (val: any) => {};
  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.matInput.disabled = isDisabled;
  }

  defaultDisplayFn(value) {
    return value ? value.name : value;
  }
}
