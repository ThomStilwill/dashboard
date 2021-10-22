import { Component,  Input,  OnInit,  AfterViewInit,  ViewChild,  Injector,  OnDestroy,  forwardRef, ElementRef} from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR,  NgControl,  ControlContainer,  AbstractControl} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { FormService } from '../services/form-service';
import { Subscription } from 'rxjs';

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

export class InputTextComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
  private subscriptions = new Subscription();
  @Input() formControlName: string;
  @Input() validationMessages: object = {};
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string;
  @Input() readonly = false;
  @ViewChild(MatInput, {static: false}) matInput: MatInput;
  @ViewChild('textinput', { static: false}) elementRef: ElementRef;

  fieldvalue: any = null;
  control: AbstractControl;

  constructor(private injector: Injector,
              private controlContainer: ControlContainer,
              private formService: FormService) {
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

  setDisabledState?(isDisabled: boolean): void {
    this.matInput.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get value(): any {
    // console.log('text get: ' + this.fieldvalue);
    return this.fieldvalue;
  }

  set value(value: any) {
    if (value !== this.fieldvalue) {
      this.fieldvalue = value;
      this.onChange(value);
      // console.log('text set: ' + this.fieldvalue);
    }
  }

  writeValue(value: any) {
    this.fieldvalue = value;
    this.onChange(value);
    if (this.elementRef) {
      this.elementRef.nativeElement.value = value;
    }
    // console.log('text write: ' + this.fieldvalue);
  }

  onChange = (val: any) => {};
  onTouched = () => {};
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
