import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private adminService: AdminService) {}

  logar(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.adminService.loginAdmin(email, password).subscribe((response: any) => {
      console.log(response);
      f.resetForm();
    });
    //this.router.navigate(['home']);
  }
}
