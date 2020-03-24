import { Component, Input, OnInit, OnDestroy, Injector, forwardRef, ViewChild, AfterViewInit} from '@angular/core';
import { ControlContainer, AbstractControl, ControlValueAccessor , NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { FormService } from '../services/form-service';
import { Subscription } from 'rxjs';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})

export class InputSelectComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();
  @Input() formControlName: string;
  @Input() validationMessages: object = {};
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string;
  @Input() readonly = false;
  @Input() items;
  @ViewChild(MatSelect, {static: false}) matInput: MatSelect;

  selectedOption: string;
  control: AbstractControl;

  constructor(private injector: Injector,
              private controlContainer: ControlContainer,
              private formService: FormService
              ) {
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  selectionChange(event) {
    this.value = event.value;
    this.onChange(this.value);
  }

  get value() {
    // console.log('select get: ' + this.selectedOption);
    return this.selectedOption;
  }

  set value(v) {
    // console.log('select set: ' + v);
    if (v != undefined && v != null && v !== this.selectedOption) {
      this.selectedOption = v;
    }

  }

  onChange = (val: any) => {};
  onTouched = () => {};
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  writeValue(value: any) {
    this.selectedOption = value;
  }

}
