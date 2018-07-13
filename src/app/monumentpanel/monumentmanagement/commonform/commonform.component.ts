import { Component, Input, OnInit } from '@angular/core';
import { Monument } from '../../../../models/AppUser';

@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrls: ['./commonform.component.css']
})
export class CommonformComponent implements OnInit {

  @Input() commonData: Monument[];

  constructor() { }

  ngOnInit() {
    console.log('received common data: ', this.commonData);
  }

}
