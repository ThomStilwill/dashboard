import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'formstate',
  templateUrl: './formstate.component.html',
  styleUrls: ['./formstate.component.scss']
})
export class FormstateComponent implements OnInit {

  @Input() formGroup: FormGroup;
  controls: FormControl[] = [];
  keys: string[] = [];

  constructor() { }

  ngOnInit() {
    this.keys = Object.keys(this.formGroup.controls);
  }
}
