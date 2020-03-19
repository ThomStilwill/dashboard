import { MatSelect } from '@angular/material';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  Injector
} from '@angular/core';
import { NgControl, ControlContainer } from '@angular/forms';
import { AbstractSelectAccessor, MakeProvider } from './abstract-select-accessor';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form-service';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  providers: MakeProvider(InputSelectComponent)
})

export class InputSelectComponent extends AbstractSelectAccessor<string>
                                implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();
  @Input() items;
  keys: string[];
  @Input() validationMessages: object = {};
  @Input() displayFunction: (value: any) => string = this.defaultDisplayFn;
  @ViewChild(MatSelect, {static: false}) matSelect: MatSelect;

  constructor(private formService: FormService, injector: Injector, controlContainer: ControlContainer ) {
    super(injector, controlContainer);
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
