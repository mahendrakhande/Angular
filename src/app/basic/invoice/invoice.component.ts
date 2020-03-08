import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Invoice } from '../shared/module/invoice';
import { Branch } from '../shared/module/branch';
import { Course } from '../shared/module/course';
import { InvoiceService } from '../shared/services/invoice.service';
import { Student } from '../shared/module/student';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  
  invoiceObj: FormGroup; 
  fb = new FormBuilder();
  invoices: Invoice[] = [];
  branches: Branch[] = [];
  courses: Course[] = []; 
  students:Student[]=[];

  invoice_link: boolean = true;
  invoice_let: boolean = true;
  invoice = this.fb.group({
    student_id: [''],
    invoice_date:[''],
    branch_id: [null],
    course_id:[null],
    start_date: [],
    end_date: [],
    certificate_issue: [false],
    invoice_rest: [''],
    invoice_ref1: [''],
    invoice_ref2: [''],
    invoice_amount: [''],
    cgst: [''],
    sgst: [''],
    total_invoice: [''],  
    tds: [''],
    net_amount: ['']
  })
 
  constructor(private _service: InvoiceService) { }

  ngOnInit() {
    this.fetchBranch();
    this.fetchCourse();
    this.fetchStudent();
    this.invoice = new FormGroup({
      student_id: new FormControl([], [Validators.required]),
      invoice_date:new FormControl('',[Validators.required]),
      branch_id: new FormControl('', [Validators.required]),
      course_id: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      certificate_issue: new FormControl(false, [Validators.required]),
      invoice_rest: new FormControl('', [Validators.required]),
       invoice_ref1: new FormControl(''),
       invoice_ref2: new FormControl(''),
      invoice_amount: new FormControl('', [Validators.required,Validators.pattern(/[1-9]+/)]),
      cgst: new FormControl('', [Validators.required]),
      sgst: new FormControl('', [Validators.required]),
      total_invoice: new FormControl('', [Validators.required]),
      tds: new FormControl('', [Validators.required]),
      net_amount: new FormControl('', [Validators.required])
    })
  }
  fetchStudent() {
    this._service.getStudent().subscribe(res=>{
      this.students=res.map((student_id,index)=>{
        return({...student_id,position:index+1})
      });
      console.log(this.students);
    });
  }
  
  
  fetchBranch() {
    this._service.getBranch().subscribe(res => {
      this.branches = res.map((branch_id, index) => {
        return ({ ...branch_id, position: index + 1 })
      });
      // console.log(this.branches);
    });
  }
  
  fetchCourse() {
    this._service.getCourse().subscribe(res => {
      this.courses = res.map((course_id, index) => {
        return ({ ...course_id, position: index + 1 })
      });
      //  console.log(this.courses);
    });
  }

  getNumberErrors(){
    return this.invoice.controls['invoice_amount'].errors.required ? "Invoice Amoumt Required" :
      this.invoice.controls['invoice_amount'].errors.pattern ? "Amount should be a Number" : "";
  }



  register() {

    console.log(this.invoice.value);
    let std = this.invoice.controls['student_id'].value;
    // this.invoiceObj.patchValue({
    //   student_id: std
    // })
    // this.invoiceArray = this.invoiceObj;
    // console.log(this.invoiceArray.value);
    this._service.postInvoice(this.invoice.value).subscribe(() => {
      alert("Insert Successfully");
      console.log(this.invoice.value);

    })
    this.invoice.reset();
    // console.log(this.invoiceObj.value);
  }
  calculate() {
    let invoice_amount = this.invoice.controls['invoice_amount'].value;
    let cgst_amt: number = ((this.invoice.controls['invoice_amount'].value) * 9) / 100;
    this.invoice.controls['cgst'].setValue(cgst_amt);
    let sgst_amt: number = ((this.invoice.controls['invoice_amount'].value) * 9) / 100;
    this.invoice.controls['sgst'].setValue(sgst_amt);
    let total_invoiceAmt: number = invoice_amount + cgst_amt + sgst_amt;
    this.invoice.controls['total_invoice'].setValue(total_invoiceAmt);
    let tds_amt: number = ((this.invoice.controls['invoice_amount'].value) * 10) / 100;
    this.invoice.controls['tds'].setValue(tds_amt);
    let net_amt: number = total_invoiceAmt - tds_amt;
    this.invoice.controls['net_amount'].setValue(net_amt);
    //console.log(total_invoiceAmt);
  }
  selectInvoice() {
    let invoice_count = this.invoice.controls['invoice_rest'].value;
    if (invoice_count == 1) {
      // this.invoice.controls['invoice_ref1'].setValue(0);
      this.invoice_link = true;
      this.invoice_let = true;
    } else {
      if (invoice_count == 2) {
        // this.invoice.controls['invoice_ref1'].setValue(1);
        // this.invoice.controls['invoice_ref2'].setValue(0);
        this.invoice_link = false;
        this.invoice_let = true;
      }
      else {
        if (invoice_count == 3) {
          // this.invoice.controls['invoice_ref1'].setValue(2);
          // this.invoice.controls['invoice_ref2'].setValue(1);
          this.invoice_link = false;
          this.invoice_let = false;
        }
      }
    }
  }
}
