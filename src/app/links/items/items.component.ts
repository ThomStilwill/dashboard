import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() items: any;
  selecteditem: any;
  selectedindex: any;

  editing = false;
  update = false;

  constructor(private service: GroupsService) { }

  ngOnInit() {
  }

  edit(index, item: any) {
    this.selecteditem = item;
    this.selectedindex = index;
    this.update = true;
    this.editing = true;
  }

  delete(index) {
    this.items.splice(index, 1);
    this.service.save();
  }

  onSubmit(data) {
    if (this.update) {
      this.items[this.selectedindex] = data;
    } else {
      this.items.push(data);
    }
    this.service.save();
    this.done();
  }

  onCancel() {
    this.done();
  }

  done () {
    this.editing = false;
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
