import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MaterialModule } from '../material.module';
import { InputTextComponent } from './components/input-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from './components/validation-messages.component';
import { FormComponent } from './components/form/form.component';
import { InputDateComponent } from './components/input-date.component';
import { InputSelectComponent } from './components/input-select.component';
import { InputCheckboxComponent } from './components/input-checkbox.component';
import { InputRadioComponent } from './components/input-radio.component';
import { FormService } from './services/form-service';
import { FormstateComponent } from './formstate/formstate.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    ConfirmComponent,
    InputTextComponent,
    InputDateComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    ValidationMessagesComponent,
    FormComponent,
    FormstateComponent,
    DialogComponent
  ],
  exports: [
    ConfirmComponent,
    InputTextComponent,
    InputDateComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConfirmComponent],
  providers: [FormService]
})
export class SharedModule {

  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error('Shared Module already loaded');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ]
    };
  }
}
