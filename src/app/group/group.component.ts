import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() group: any;

  constructor(private service: GroupsService) { }

  ngOnInit() {
  }

}
