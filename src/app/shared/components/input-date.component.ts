import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  forwardRef,
  Injector,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ControlContainer,
  AbstractControl
} from '@angular/forms';
import { MatInput } from '@angular/material';

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
export class InputDateComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() formControlName: string;
  @Input() validationMessages: object = {};
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string;
  @Input() readonly = false;
  @Input() displayFunction: (value: any) => string = this.defaultDisplayFn;
  @ViewChild(MatInput, {static: false}) matInput: MatInput;

  @Input() value;

  valuefield: any = null;
  control: AbstractControl;

  @HostListener('input', ['$event.target.value']) onChange = (_: any) => { };
  @HostListener('blur', []) onTouched = () => { };

  constructor(private injector: Injector,
              private cdr: ChangeDetectorRef,
              private controlContainer: ControlContainer  ) {
  }

  ngOnInit() {

    this.cdr.detectChanges();

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

  onDateChange(event) {
    this.onChange(event.value);
  }

  writeValue(value: any) {
    this.valuefield = value;
    this.onChange(value);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState?(isDisabled: boolean): void {
    this.matInput.disabled = isDisabled;
  }

  defaultDisplayFn(value) {
    return value ? value.name : value;
  }
}
