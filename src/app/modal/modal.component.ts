import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;

  constructor(
    private adminService: AdminService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private location: Location
  ) {}

  createUser(f: NgForm) {
    const name = f.value.name;
    const email = f.value.email;
    const password = f.value.password;
    const confirmPassword = password;
    const subscribed = JSON.stringify(f.value.sub);
    const channel = f.value.channel;
    const category = f.value.category;
    const photo = this.fileInput?.nativeElement.files[0];

    this.adminService
      .createUser(
        name,
        email,
        password,
        confirmPassword,
        subscribed,
        channel,
        category
      )
      .subscribe((response: any) => {
        f.resetForm();
        this.dialogRef.close();
        this.adminService.getAllUsers();
      });
  }
}
