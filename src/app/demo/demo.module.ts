import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoRoutingModule } from './demo-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DemoComponent, FormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DemoRoutingModule,
    SharedModule.forRoot()
  ]
})
export class DemoModule { }
