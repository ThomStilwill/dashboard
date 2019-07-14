import { Component, Input, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LinkData } from '../models/LinkData';

@Component({
  selector: 'app-linkedit',
  templateUrl: './linkedit.component.html',
  styleUrls: ['./linkedit.component.scss']
})
export class LinkeditComponent {

  constructor(public dialogRef: MatDialogRef<LinkeditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LinkData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
