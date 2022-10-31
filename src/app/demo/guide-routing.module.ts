import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideComponent } from './guide.component';
import { EditComponent } from './edit/edit.component';
import { TableComponent } from './table/table.component';
import { LayoutsandboxComponent } from './layoutsandbox/layoutsandbox.component';

const routes: Routes = [
  { path: 'guide',
    component: GuideComponent,
    children: [
      { path: 'edit', component: EditComponent },
      { path: 'table', component: TableComponent },
      { path: 'layout', component: LayoutsandboxComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule { }
