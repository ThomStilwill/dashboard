import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MaterialModule } from '../material.module';
import { InputTextComponent } from './components/input-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from './components/validation-messages.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    InputTextComponent,
    ValidationMessagesComponent,
    FormComponent
  ],
  exports: [
    ConfirmComponent,
    InputTextComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConfirmComponent]
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
