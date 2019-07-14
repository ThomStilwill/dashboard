import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { ItemsComponent } from './items/items.component';
import { LinkeditComponent } from './linkedit/linkedit.component';
import { GroupComponent } from './group/group.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GroupsComponent,
    ItemsComponent,
    LinkeditComponent,
    GroupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    GroupsComponent
  ]
})

export class LinksModule { }
