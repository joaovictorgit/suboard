import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = false;
    dialogConfig.autoFocus = false;
    dialogConfig.position = { left: '35%', top: '10px' };
    dialogConfig.width = '500px';
    dialogConfig.height = '600px';
    this.dialog.open(ModalComponent, dialogConfig);
  }
}
