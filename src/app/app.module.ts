import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinksModule } from './links/links.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import { DemoModule } from './demo/demo.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DemoModule,
    AppRoutingModule,
    LinksModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS,
               useValue: {
                ...new MatDialogConfig(),
                disableClose: true,
                autoFocus: true,
                hasBackdrop: true,
                width: '400px',
                position: {
                  top: '60px'
                }
                } as MatDialogConfig
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
