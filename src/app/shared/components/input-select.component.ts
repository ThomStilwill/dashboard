import { Component, Input, OnInit, AfterViewInit, ViewChild, OnDestroy, Injector, ElementRef, forwardRef, Renderer2} from '@angular/core';
import { NgControl, ControlContainer, AbstractControl, ControlValueAccessor , NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { FormService } from '../services/form-service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

export class InputSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {

  private subscriptions = new Subscription();
  @Input() formControlName: string;
  @Input() validationMessages: object = {};
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string;
  @Input() readonly = false;
  @Input() items;

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  selectionChange(event)
  {
    this.value = event.value;
    this.onChange(this.value);
    // debugger;
    // this.changeEvent.emit();
  }

  get value() {
    return this.selectedOption;
  }

  set value(v) {
    if (v != undefined && v != null && v !== this.selectedOption) {
      this.selectedOption = v;
    }
  }

  // get value(): any {
  //   console.log('text get: ' + this.fieldvalue);
  //   return this.fieldvalue;
  // }

  // set value(value: any) {
  //   if (value !== this.fieldvalue) {
  //     this.fieldvalue = value;
  //     console.log('text set: ' + this.fieldvalue);
  //   }
  // }

  onChange = (val: any) => {};
  onTouched = () => {};
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  writeValue(value: any) {
    this.selectedOption = value;
    console.log('text write: ' + this.value);
  }

}
