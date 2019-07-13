import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups: any;

  constructor(private http: HttpClient) {  }

   load() {
    return this.http.get('api/groups').subscribe(data => {
      this.groups = data;
    });
   }

   save() {
    this.groups.forEach(group => {
      const groupjson = JSON.stringify(group);

      this.http.put('api/groups/' + group.id, groupjson , { headers: { 'Content-Type': 'application/json' } }).subscribe(result => {
        console.log(result);
      });
    });
   }

}
