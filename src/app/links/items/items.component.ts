import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GroupsService } from '../services/groups.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LinkeditComponent } from '../linkedit/linkedit.component';
import { LinkData } from '../models/LinkData';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() group: any;
  items: any;
  selecteditem: any;
  selectedindex: any;

  update = false;

  constructor(private service: GroupsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.items = this.group.items;
  }

  openDialog(item: any): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px';
    dialogConfig.position = {
      top: '160px'
    };
    dialogConfig.data = item;

    const dialogRef = this.dialog.open(LinkeditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.save(result);
      } else {
        console.log('Cancelled');
      }
      this.cleanup();

    });
  }

  insert() {
    this.update = false;
    const item = {} as LinkData;
    this.openDialog(item);
  }

  edit(index, item: any) {
    this.selecteditem = item;
    this.selectedindex = index;
    this.update = true;
    this.openDialog(item);
  }

  delete(index) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px';
    dialogConfig.position = {
      top: '160px'
    };
    dialogConfig.data = 'Do you confirm the deletion of this data?';

    const dialogRef = this.dialog.open(ConfirmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.items.splice(index, 1);
        this.service.save();
      }
    });
  }

  save(data) {
    if (this.update) {
      this.items[this.selectedindex] = data;
    } else {
      this.items.push(data);
    }
    this.service.save();
  }

  cleanup() {
    this.update = false;
    this.selectedindex = null;
    this.selecteditem = null;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    this.service.save();
  }
}
