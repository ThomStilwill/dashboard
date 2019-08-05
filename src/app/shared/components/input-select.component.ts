import { MatSelect } from '@angular/material';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractSelectAccessor, MakeProvider } from './abstract-select-accessor';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  providers: MakeProvider(InputSelectComponent)
})

export class InputSelectComponent extends AbstractSelectAccessor<string>
                                implements OnInit, AfterViewInit {

  @Input() items;
  @Input() validationMessages: object = {};
  @Input() displayFunction: (value: any) => string = this.defaultDisplayFn;
  @ViewChild(MatSelect, {static: false}) matSelect: MatSelect;

  keys: string[];

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

    this.keys = Object.keys(this.items);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.matSelect.ngControl = this.injector.get(NgControl, null);
    });
  }

  setDisabledState?(isDisabled: boolean): void {
    this.matSelect.disabled = isDisabled;
  }

  defaultDisplayFn(value) {
    return value ? value.name : value;
  }
}
