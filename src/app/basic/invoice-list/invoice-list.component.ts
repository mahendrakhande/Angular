import { Component, OnInit } from '@angular/core';
import { Invoice } from '../shared/module/invoice';
import { InvoiceService } from '../shared/services/invoice.service';
import { Student } from '../shared/module/student';
import { Branch } from '../shared/module/branch';
import { Course } from '../shared/module/course';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  students:Student[]=[];
  branches:Branch[]=[];
  courses:Course[]=[];
  constructor(private _service: InvoiceService) { }

  ngOnInit() {
    this.fetchInvoice();
  }
  fetchInvoice() {
    this._service.getInvoice().subscribe(res => {
      this.invoices = res.map((id, index) => {
        return ({ ...id, position: index + 1 })
      });

      // console.log(this.branches);
    });

    this._service.getBranch().subscribe(res => {
      this.branches = res.map((id, index) => {
        return ({ ...id, position: index + 1 })
      });
      console.log(this.branches);
    });

    this._service.getCourse().subscribe(res => {
      this.courses = res.map((id, index) => {
        return ({ ...id, position: index + 1 })
      });
      console.log(this.courses);
    });

  }
}
