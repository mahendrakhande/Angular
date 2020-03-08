import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicRoutingModule } from './basic-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { StudentComponent } from './student/student.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [InvoiceComponent, LoginComponent, InvoiceListComponent, StudentComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    BasicRoutingModule
  ],
  exports: [InvoiceComponent,LoginComponent,InvoiceListComponent, StudentComponent, PageNotFoundComponent],
})
export class BasicModule { }
