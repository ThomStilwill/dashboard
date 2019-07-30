import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideComponent } from './guide.component';
import { EditComponent } from './edit/edit.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'guide',
    component: GuideComponent,
    children: [
      { path: 'edit', component: EditComponent },
      { path: 'table', component: TableComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule { }
