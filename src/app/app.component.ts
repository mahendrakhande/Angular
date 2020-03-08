import { Component } from '@angular/core';
import { InvoiceService } from './basic/shared/services/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Invoice Management System';
  constructor(private _service:InvoiceService,private _router:Router){}
  logout(){
    this._service.logoutUser();
    this._router.navigate(['/']);
  }
}
