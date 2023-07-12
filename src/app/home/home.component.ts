import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'Home';
  saveAdmin: any = {};
  users: any = [];
  constructor(
    private router: Router,
    private adminService: AdminService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const data: any = this.localStorage.get('@admin');
    this.getAllUsers();
    this.saveAdmin = data;
  }

  onUser(r: Router) {
    this.router.navigate(['user']);
    console.log('Foi');
  }

  getAllUsers() {
    this.adminService.showAllUsers().subscribe((response: any) => {
      this.users = response.results;
    });
  }

  navigateUser(): void {
    console.log('Foi');
  }
}
