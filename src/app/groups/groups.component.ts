import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: any;

  constructor(private http: HttpClient) {
    this.http.get('api/groups').subscribe(data => {
      this.groups = data;
    });
  }

  ngOnInit() {
  }

  onchange(event) {
    console.log(this.groups);

    this.groups.forEach(group => {
      const groupjson = JSON.stringify(group);

      this.http.put('api/groups/' + group.id, groupjson , { headers: { 'Content-Type': 'application/json' } }).subscribe(result => {
        console.log(result);
      });
    });

  }
}
