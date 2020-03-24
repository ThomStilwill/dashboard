import { forwardRef, Input, Injector, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor
  , NG_VALUE_ACCESSOR, AbstractControl, NgControl } from '@angular/forms';
import { MatFormFieldControl, MatSelect } from '@angular/material';

export abstract class AbstractSelectAccessor <T>
                implements ControlValueAccessor {

    @Input() formControlName: string;
    @Input() label: string;
    @Input() hint: string;
    @Input() placeholder: string;
    @Input() readonly = false;
    // @ViewChild(MatSelect, {static: false}) matSelect: MatSelect;

    valuefield: any = null;
    control: AbstractControl;

    constructor(protected injector: Injector,
                protected controlContainer: ControlContainer) {}

    compareWith: (o1: any, o2: any) => boolean;

    setDisabledState(isDisabled: boolean): void {
      throw new Error("Method not implemented.");
    }

    get value(): T {
      return this.valuefield;
    }

    set value(v: T) {
      if (v !== this.valuefield) {
        this.valuefield = v;
        this.onChange(v);
      }
    }

    writeValue(value: T) {
      this.valuefield = value;
      this.onChange(value);
    }

    onChange = (_) => {};
    onTouched = () => {};

    registerOnChange(fn: (_: T) => void): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
}

export function MakeProvider(type: any) {
    return [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => type),
  }

  ];
}
