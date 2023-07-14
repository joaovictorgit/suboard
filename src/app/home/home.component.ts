import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { AdminService } from '../admin/admin.service';
import { ModalService } from '../modal/modal.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../modal-user/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  filterUsers: any[] = [];
  title = 'Home';
  saveAdmin: any = {};
  users: any[] = [];
  images: any = {};
  checkbox1 = false;
  checkbox2 = false;
  checkbox3 = false;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private localStorage: LocalStorageService,
    private modalService: ModalService,
    private modalUserService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const data: any = this.localStorage.get('@admin');
    this.adminService.user$.subscribe((users) => {
      this.users = users;
    });
    this.adminService.getAllUsers();
    this.saveAdmin = data;
  }

  getImage(id: any) {
    let image = `http://localhost:3000/api/admin/image/${JSON.stringify(id)}`;
    return image;
  }

  openModal(): void {
    this.modalService.openModal();
  }

  openModalUser(user: any): void {
    this.modalUserService.openModalUser(user);
  }

  onCheckboxChange(checkboxNumber: number): void {
    if (checkboxNumber === 1) {
      this.checkbox1 = true;
      this.checkbox2 = false;
      this.checkbox3 = false;
    } else if (checkboxNumber === 2) {
      this.checkbox1 = false;
      this.checkbox2 = true;
      this.checkbox3 = false;
    } else if (checkboxNumber === 3) {
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox3 = true;
    }
  }

  getAllUsers(): void {
    this.adminService.showAllUsers().subscribe((response: any) => {
      this.users = response.results;
    });
  }

  search(f: NgForm): void {
    this.searchTerm = f.value.searchTerm;
    for (let i = 0; i < this.users.length; i++) {
      const item: any = this.users[i];
      if (this.searchTerm === item.category) {
        console.log(item);
      }
    }
    let aux: any[] = [];
    if (this.checkbox1 === true) {
      aux = this.users.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.checkbox2 === true) {
      aux = this.users.filter((item) =>
        item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      aux = this.users.filter((item) =>
        item.subscribed.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.filterUsers = aux;
    this.users = this.filterUsers;
  }

  navigateUser(): void {
    console.log('Foi');
  }
}
