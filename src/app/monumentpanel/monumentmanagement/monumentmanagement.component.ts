import { Component, Input, OnInit } from '@angular/core';
import { MonumentsService } from '../../../services/monuments.service';
import { ActivatedRoute } from '@angular/router';
import { Information, Monument } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-monumentmanagement',
  templateUrl: './monumentmanagement.component.html',
  styleUrls: ['./monumentmanagement.component.css']
})
export class MonumentmanagementComponent implements OnInit {

  monId: string;
  monumentData: Monument[] = [];
  monumentInformation: Information[] = [];

  @Input() returnData;

  constructor(
    private _monumentService: MonumentsService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.getMonument(this.monId);
  }

  getMonument(id: string): void {
    this._monumentService.getMonumentById(id).subscribe(
      (monument: Monument) => {
        this.monumentData.push(monument);
        for (let i = 0; i <= monument.information.length - 1; i++) {
          this.monumentInformation.push(monument.information[i]);
        }
      });
  }

  getReturnedInformation(information) {
    this.monumentData[0].information = information;
  }

  getReturnedCommonData(common) {
    this.monumentData.push(common);
  }

  submitForm() {
    console.log('saved commonData: ', this.monumentData );

  }

}
