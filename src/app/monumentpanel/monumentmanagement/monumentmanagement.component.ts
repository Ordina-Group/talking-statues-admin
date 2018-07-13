import { Component, OnInit } from '@angular/core';
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

  sub: Subscription;
  monumentData: Monument[] = [];
  monumentInformation: Information[] = [];

  constructor(
    private _monumentService: MonumentsService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.fetchIdSegment();
  }

  fetchIdSegment() {
    this.sub = this._route.params.subscribe(params => {
      const id: string = params['id'];
      console.log(id);
      if (id !== 'addmonument') {
        this.getMonument(id);
      }
    });
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

}
