import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
const indexRoutes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  { path: 'index', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(indexRoutes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
