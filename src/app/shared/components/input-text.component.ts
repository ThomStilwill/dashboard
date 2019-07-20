import { MatInput } from '@angular/material';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractValueAccessor, MakeProvider } from './abstract-value-accessor';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: MakeProvider(InputTextComponent)
})

export class InputTextComponent extends AbstractValueAccessor<string>
                                implements OnInit, AfterViewInit {

  @Input() validationMessages: object = {};
  @Input() displayFunction: (value: any) => string = this.defaultDisplayFn;
  @ViewChild(MatInput, {static: false}) matInput: MatInput;

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

  setDisabledState?(isDisabled: boolean): void {
    this.matInput.disabled = isDisabled;
  }

  defaultDisplayFn(value) {
    return value ? value.name : value;
  }
}
