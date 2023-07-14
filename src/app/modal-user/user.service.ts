import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalUserComponent } from './modal-user.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any = {
    name: '',
    email: '',
    password: '',
    subscribed: '',
    category: '',
  };
  constructor(private dialog: MatDialog) {}

  openModalUser(user: any): void {
    this.user = user;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = false;
    dialogConfig.autoFocus = false;
    dialogConfig.position = { left: '25%', top: '5%' };
    dialogConfig.width = '800px';
    dialogConfig.height = '420px';
    this.dialog.open(ModalUserComponent, dialogConfig);
  }

  getUser() {
    return this.user;
  }
}
