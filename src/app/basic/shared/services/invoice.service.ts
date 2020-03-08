import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Branch } from '../module/branch';
import { Course } from '../module/course';
import { Invoice } from '../module/invoice';
import { Login } from '../module/login';
import { Student } from '../module/student';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  branchURL: string = "http://localhost:3000/branch";
  studentURL: string = "http://localhost:3000/student";
  courseURL: string = "http://localhost:3000/course";
  invoiceURL: string = "http://localhost:3000/invoice";
  loginURL: string = "http://localhost:3000/login";

  constructor(private _http: HttpClient) { }

  getUserLogins(){
    return this._http.get<Login[]>(this.loginURL);
  }
  getBranch() {
    return this._http.get<Branch[]>(this.branchURL);
  }
  getStudent() {
    return this._http.get<Student[]>(this.studentURL);
  }
  getCourse() {
    return this._http.get<Course[]>(this.courseURL);
  }

  postInvoice(invo: Invoice) {
    return this._http.post(this.invoiceURL, invo);
  }
  postStudent(stud: Invoice) {
    return this._http.post(this.studentURL, stud);
  }
  logoutUser(){
    return sessionStorage.clear();
  }
  getInvoice(){
    return this._http.get<Invoice[]>(this.invoiceURL);
  }
}