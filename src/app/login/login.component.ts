import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private adminService: AdminService,
    private localStorage: LocalStorageService
  ) {}

  logar(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.adminService.loginAdmin(email, password).subscribe((response: any) => {
      //console.log(response);
      this.localStorage.set('@admin', response.result);
      this.localStorage.set('@token', response.token);
      f.resetForm();
      this.router.navigate(['home']);
    });
  }
}
