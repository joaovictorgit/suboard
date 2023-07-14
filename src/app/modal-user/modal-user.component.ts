import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent {
  imageUrl: string = '';
  nameUser: string = '';
  emailUser: string = '';
  subscribedUser: number = 0;
  channelUser: string = '';
  categoryUser: string = '';
  user: any = {};

  constructor(
    private dialogRef: MatDialogRef<ModalUserComponent>,
    private modalUserService: UserService,
    private adminService: AdminService
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.user = this.modalUserService.getUser();
    this.nameUser = this.user.name;
    this.emailUser = this.user.email;
    this.subscribedUser = this.user.subscribed;
    this.channelUser = this.user.channel;
    this.categoryUser = this.user.category;
  }

  deleteModalUser(id: any) {
    this.adminService.deleteUser(JSON.stringify(id)).subscribe((response) => {
      this.dialogRef.close();
      this.adminService.getAllUsers();
    });
  }

  updateModalUser(form: NgForm) {
    if (this.imageUrl !== '') {
      this.adminService.createImage(this.user.user_id, this.imageUrl);
      this.dialogRef.close();
      this.adminService.getAllUsers();
    }
    this.nameUser = form.value.nameUser;
    this.emailUser = this.user.emailUser;
    this.subscribedUser = this.user.subscribedUser;
    this.channelUser = this.user.channelUser;
    this.categoryUser = this.user.categoryUser;

    this.adminService
      .updatedUser(this.user.user_id, {
        name: this.nameUser,
        email: this.emailUser,
        subscribed: JSON.stringify(this.subscribedUser),
        channel: this.channelUser,
        category: this.categoryUser,
      })

      .subscribe((response) => {
        console.log(response);
        form.resetForm();
        this.dialogRef.close();
        this.adminService.getAllUsers();
      });
  }
}
