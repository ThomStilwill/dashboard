import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideComponent } from './guide.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuideRoutingModule } from './guide-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './table/table.component';
import { ExpressionService } from './services/expression.service';
import { PersonComponent } from './person/person.component';


@NgModule({
  declarations: [
    GuideComponent,
    EditComponent,
    TableComponent,
    PersonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    GuideRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [
    ExpressionService
  ]
})
export class GuideModule { }
