import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MaterialModule } from '../material.module';
import { InputTextComponent } from './components/input-text.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    InputTextComponent
  ],
  exports: [
    ConfirmComponent,
    InputTextComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
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
