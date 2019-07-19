import { forwardRef, Input } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';

export abstract class AbstractValueAccessor <T>
                implements ControlValueAccessor {

    _value: T = null;
    @Input() formControlName: string;

    constructor(protected controlContainer: ControlContainer) {}

    get value(): T {
      return this._value;
    }

    set value(v: T) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }

    writeValue(value: T) {
      this._value = value;
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
