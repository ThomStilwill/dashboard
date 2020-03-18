import { MatInput } from '@angular/material';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  Injector,
  OnDestroy
} from '@angular/core';
import { NgControl, ControlContainer } from '@angular/forms';
import { AbstractValueAccessor, MakeProvider } from './abstract-value-accessor';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form-service';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: MakeProvider(InputTextComponent)
})

export class InputTextComponent extends AbstractValueAccessor<string>
                                implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions = new Subscription();
  @Input() validationMessages: object = {};
  @Input() displayFunction: (value: any) => string = this.defaultDisplayFn;
  @ViewChild(MatInput, {static: false}) matInput: MatInput;

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
