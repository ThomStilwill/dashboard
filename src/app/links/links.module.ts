import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { ItemsComponent } from './items/items.component';
import { LinkeditComponent } from './linkedit/linkedit.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LinksComponent } from './links.component';

@NgModule({
  declarations: [
    GroupsComponent,
    ItemsComponent,
    LinkeditComponent,
    LinksComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    LinksComponent
  ],
  entryComponents: [LinkeditComponent]
})

export class LinksModule { }
