import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InvoiceService } from '../shared/services/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin = new FormGroup({
    user_name: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private _service: InvoiceService,private _router: Router) { }

  ngOnInit() {
  }
  login() {
    let user = this.userLogin.controls['user_name'].value;
    let pass = this.userLogin.controls['password'].value;
    console.log(user,pass);
    this._service.getUserLogins().subscribe(
      res => {
        let data = res;
        console.log(data);
        let isLogin = data.some(d => d.user_name == user && d.password == pass)
        if (isLogin) {
          sessionStorage.setItem('user_name', user);
          this._router.navigate(['/invoiceList']);
        }
      }
    )
    this.userLogin.reset();
  }
}
