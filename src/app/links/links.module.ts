import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { ItemsComponent } from './items/items.component';
import { LinkeditComponent } from './linkedit/linkedit.component';
import { GroupComponent } from './group/group.component';



@NgModule({
  declarations: [
    GroupsComponent,
    ItemsComponent,
    LinkeditComponent,
    GroupComponent],
  imports: [
    CommonModule
  ]
})
export class LinksModule { }
