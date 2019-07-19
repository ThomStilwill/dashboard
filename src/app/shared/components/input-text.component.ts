import { MatAutocompleteTrigger, MatInput } from '@angular/material';
import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  forwardRef,
  Injector
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  // styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements AfterViewInit, OnChanges, ControlValueAccessor, Validator {

  @Input() label: string;
  @Input() hint: string;


  @Input() options: any[] = [];
  @Input() readonly = false;
  @Input() displayFunction: (value: any) => string = this.defaultDisplayFn;
  @Input() filterFunction: (value: any) => any[] = this.defaultFilterFn;

  @ViewChild(MatAutocompleteTrigger, {static: false}) trigger: MatAutocompleteTrigger;
  @ViewChild(MatInput, {static: false}) matInput: MatInput;

  filteredOptions: any[];
  optionSelected = '';
  onChange = (val: any) => {};
  onTouched = () => {};

  constructor(
    private injector: Injector
  ) { }

  ngAfterViewInit() {
    this.trigger.panelClosingActions
      .subscribe(
        e => {
          if (this.trigger.activeOption) {
            const value = this.trigger.activeOption.value;
            this.writeValue(value);
            this.onChange(value);
          }
        }
      );

    // this is needed in order for the mat-form-field to be marked as invalid when the control is invalid
    setTimeout(() => {
      this.matInput.ngControl = this.injector.get(NgControl, null);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      this.filterOptions(this.optionSelected);
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.trigger.writeValue(obj);
      this.optionSelected = obj;
      this.filterOptions(obj);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.matInput.disabled = isDisabled;
    this.trigger.setDisabledState(isDisabled);
  }

  validate(c: AbstractControl): { [key: string]: any; } {
    return c;
  }

  valueChanged(event) {
    const value = event.target.value;
    this.optionSelected = value;
    this.onChange(value);
    this.filterOptions(value);
  }

  onOptionSelected(event) {
    const value = event.option.value;
    this.optionSelected = value;
    this.onChange(value);
    this.filterOptions(value);
  }

  filterOptions(value) {
    this.filteredOptions = this.filterFunction(value);
  }

  private defaultFilterFn(value) {
    let name = value;

    if (value && typeof value === 'object') {
      name = value.name;
    }

    return this.options.filter(
      o => o.name.toLowerCase().indexOf(name ? name.toLowerCase() : '') !== -1
    );
  }

  defaultDisplayFn(value) {
    return value ? value.name : value;
  }
}
