import { Component, OnInit } from '@angular/core';

class Div {
  color: string;
  divs: Array<string>;
  constructor(color:string, divs:Array<string>) {
    this.color = color;
    this.divs = divs;
  }
}

@Component({
  selector: 'app-layoutsandbox',
  templateUrl: './layoutsandbox.component.html',
  styleUrls: ['./layoutsandbox.component.scss']
})
export class LayoutsandboxComponent implements OnInit {

  fields = new Array<Div>();

  constructor() {
    const colors = this.colors(5,10, 1);
    colors.forEach(color => {
      const div = new Div(color,this.colors(2,4,.2));
      this.fields.push(div);
    })
   }

  ngOnInit(): void {
    console.log('x');
  }

  randomInt(start,end, zero){
    return Math.random() >= zero ? 0 : Math.floor(Math.random() * (end - start)) + start;
  }

  colors(start,end, zeroPercent) {
    const count = this.randomInt(start,end,zeroPercent);
    const colors = new Array<string>();
    for(let i=0;i<count;i++){
      colors.push(this.color());
    }
    return colors;
  }

  color() {
    let rc = "#";
    for(let i=0; i<6; i++){
        rc += Math.floor(Math.random()*16).toString(16);
    }
    return rc;
  }

}
