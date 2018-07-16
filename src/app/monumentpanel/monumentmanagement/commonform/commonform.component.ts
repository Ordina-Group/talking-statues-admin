import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Information, Monument } from '../../../../models/AppUser';

@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrls: ['./commonform.component.css']
})
export class CommonformComponent implements OnInit, AfterViewInit{

  @Input() commonData: Monument[];
  commonInfo: Monument[];

  constructor() {
  }

  ngOnInit() {
    this.fetchCommonInfo();
  }

  ngAfterViewInit() {
    this.fetchCommonInfo();
  }

  fetchCommonInfo() {
    this.commonInfo = this.commonData;
    console.log('received common data: ', this.commonInfo);
  }

}
