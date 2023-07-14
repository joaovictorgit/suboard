import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';

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
    private modalUserService: UserService
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
}
