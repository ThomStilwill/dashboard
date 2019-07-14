import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupsService } from '../../services/groups.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: any;


  constructor(private service: GroupsService) {
    this.service.load().add(() => {
      this.groups = service.groups;
    });
  }

  ngOnInit() {
  }

}
