import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { StudentComponent } from './student/student.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
