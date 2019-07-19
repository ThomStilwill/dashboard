import { Component, OnInit, OnDestroy, DoCheck, Input, ElementRef, Injector, HostBinding } from '@angular/core';
import { AbstractControl, ControlContainer, NgControl } from '@angular/forms';
import { AbstractValueAccessor, MakeProvider} from './abstract-value-accessor';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: [MakeProvider(InputTextComponent)]
})

export class InputTextComponent
       extends AbstractValueAccessor<string>
        implements OnInit, OnDestroy, DoCheck {

    @Input() label: string;
    @Input() type = 'text';
    @Input() placeholder: string;
    @Input() hint: string;
    @Input() validationMessages: object = {};

    @Input()
    get required() {
       return this._required;
    }
    set required(req) {
       this._required = coerceBooleanProperty(req);
       this.stateChanges.next();
    }
    public _required = false;

    @Input()
    get disabled() {
      return this._disabled;
    }
    set disabled(dis) {
      this._disabled = coerceBooleanProperty(dis);
      this.stateChanges.next();
    }
    public _disabled = false;

    @HostBinding('class.floating')
    get shouldLabelFloat() {
      return this.focused || !this.empty;
    }

    get empty() {
      const commentText = this.value.trim();
      return commentText ? false : true;
   }

    stateChanges = new Subject<void>();
    ngControl: any;
    controlType = 'input';
    errorState = false;
    focused: boolean;

    debug = false;
    control: AbstractControl;

    constructor(controlContainer: ControlContainer,
                public elRef: ElementRef,
                public injector: Injector,
                private fm: FocusMonitor) {
        super(controlContainer);

        fm.monitor(elRef.nativeElement, true).subscribe(origin => {
          this.focused = !!origin;
          this.stateChanges.next();
        });
    }

    ngOnDestroy() {
      this.stateChanges.complete();
      this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    ngDoCheck(): void {
      if (this.ngControl) {
        this.errorState = this.ngControl.invalid && this.ngControl.touched;
        this.stateChanges.next();
      }
   }

    ngOnInit() {

      this.ngControl = this.injector.get(NgControl);
      if (this.ngControl != null) {
        this.ngControl.valueAccessor = this;
      }

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
}
