import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinksComponent } from './links/links.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: AboutComponent, pathMatch: 'full'},
  { path: 'home', component: AboutComponent},
  { path: 'links', component: LinksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
