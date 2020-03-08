import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/module/student';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { InvoiceService } from '../shared/services/invoice.service';
import { Branch } from '../shared/module/branch';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
students:Student[]=[];
branches:Branch[]=[]; 
fb = new FormBuilder();
invoice = this.fb.group({
  student_name: [''],
  email:[''],
  mobile_no:[],
  branch_name:['']
  
})
  constructor(private _service:InvoiceService) { }

  ngOnInit() {
    this.fetchBranch();
    this.invoice = new FormGroup({
      student_name: new FormControl([], [Validators.required]),
      email:new FormControl('',[Validators.required]),
      invoice_amount: new FormControl('', [Validators.required,Validators.pattern(/[1-9]{10}/)]),
      mobile_no: new FormControl('', [Validators.required]),
      branch_name: new FormControl('', [Validators.required])
    })
  }  
  getNameErrors(){
    return this.invoice.controls['student_name'].errors.pattern ? "Name should be a character" : "";
  }
  fetchBranch() {
    this._service.getBranch().subscribe(res => {
      this.branches = res.map((branch_id, index) => {
        return ({ ...branch_id, position: index + 1 })
      });
       console.log(this.branches);
    });
  }
  studentDetails() {

    console.log(this.invoice.value);
    let std = this.invoice.controls['student_name'].value;
    this._service.postStudent(this.invoice.value).subscribe(() => {
      alert("Insert Successfully");
      console.log(this.invoice.value);
    })
    this.invoice.reset();
  }
}  
