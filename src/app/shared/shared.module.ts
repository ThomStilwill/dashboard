import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [ConfirmComponent],
  exports: [ConfirmComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [ConfirmComponent]
})
export class SharedModule { }
