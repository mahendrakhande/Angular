import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './basic/invoice-list/invoice-list.component';
import { AuthGuard } from './basic/shared/auth/auth.guard';
import { PageNotFoundComponent } from './basic/page-not-found/page-not-found.component';


const routes: Routes = [
  // {
  //   path:'',
  //   loadChildren:'./basic-routing.module#'
  // }
  {
    path:'invoiceList',
    component:InvoiceListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
