import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoRoutingModule } from './demo-routing.module';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [DemoComponent, FormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
