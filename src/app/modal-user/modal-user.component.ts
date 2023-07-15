import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin/admin.service';
import { LocalStorageService } from '../local-storage.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef =
    new ElementRef(null);
  selectedFile?: ImageSnippet;

  imageUrl: string = '';
  nameUser: string = '';
  emailUser: string = '';
  subscribedUser: string = '';
  channelUser: string = '';
  categoryUser: string = '';
  user: any = {};

  constructor(
    private dialogRef: MatDialogRef<ModalUserComponent>,
    private modalUserService: UserService,
    private adminService: AdminService,
    private localStorage: LocalStorageService
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.adminService
        .createImage(JSON.stringify(this.user.user_id), this.selectedFile.file)
        .subscribe((res: any) => {
          console.log(res);
        });
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

  dataURItoBlob(dataURI: string) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg',
    });
  }

  updateImage() {}

  async updateModalUser(form: NgForm) {
    const name = form.value.nameUser;
    const email = form.value.emailUser;
    const subscribed = form.value.subscribedUser;
    const channel = form.value.channelUser;
    const category = form.value.categoryUser;

    console.log(name, email, subscribed, channel, category);
    await fetch(`http://localhost:3000/api/admin/user/${this.user.user_id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, email, subscribed, channel, category }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.localStorage.get('@token')}`,
      },
    }).then((response: any) => {
      console.log(response);
      this.dialogRef.close();
      this.adminService.getAllUsers();
    });
  }
}
