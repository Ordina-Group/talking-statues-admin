import { Component, Input, OnInit } from '@angular/core';
import { Information, Monument } from '../../../../models/AppUser';
import { MonumentsService } from '../../../../services/monuments.service';

@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrls: ['./commonform.component.css']
})
export class CommonformComponent implements OnInit {

  @Input() commonData: Monument[];
  commonInfo: Monument[];
  areas: String[] = [];

  constructor(
    private monumentService: MonumentsService,
  ) {
  }

  ngOnInit() {
    this.fetchCommonInfo();
    this.getAllAreas();
  }

  getAllAreas() {
    this.monumentService.getAreas().subscribe(data => {
      for (let i = 0; i <= (data.length - 1); i++) {
        this.areas.push(data[i]);
        console.log(data[i] + ' has been added.');
      }
    });
  }

  fetchCommonInfo() {
    this.commonInfo = this.commonData;
    console.log('received common data: ', this.commonInfo);
  }

}
