import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  forwardRef,
  Injector,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ControlContainer,
  AbstractControl
} from '@angular/forms';
import { MatInput } from '@angular/material';
import { FormService } from '../services/form-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  private subscriptions = new Subscription();
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
              private controlContainer: ControlContainer,
              private formService: FormService ) {
  }

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.matInput.ngControl = this.injector.get(NgControl, null);
    });
  }

  onDateChange(event) {
    this.onChange(event.value);
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
