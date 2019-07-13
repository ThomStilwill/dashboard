import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { ItemsComponent } from './items/items.component';
import { MaterialModule } from './material.module';
import { LinkeditComponent } from './linkedit/linkedit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    ItemsComponent,
    LinkeditComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
