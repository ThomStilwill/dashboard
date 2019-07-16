import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { ItemsComponent } from './items/items.component';
import { LinkeditComponent } from './linkedit/linkedit.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GroupsComponent,
    ItemsComponent,
    LinkeditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    GroupsComponent
  ],
  entryComponents: [LinkeditComponent]
})

export class LinksModule { }
