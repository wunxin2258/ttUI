import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './errorModule/page-not-found/page-not-found.component';
import { ErrorComponent } from './errorModule/error/error.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: './indexModule/index.module#IndexModule'
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  declarations: [ErrorComponent, PageNotFoundComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
