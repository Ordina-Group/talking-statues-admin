import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Information, Monument} from '../../../../models/AppUser';
import {MonumentsService} from '../../../../services/monuments.service';
import {ActivatedRoute} from '@angular/router';
import {MonumentmanagementComponent} from '../monumentmanagement.component';

@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrls: ['./commonform.component.css']
})
export class CommonformComponent implements OnInit {

  @Output() returnCommonData = new EventEmitter<Monument>();
  monId: string;
  currentMonument: Monument;
  monumentFound = false;
  areas: String[] = [];

  constructor(private _route: ActivatedRoute, private monumentService: MonumentsService) {

  }

  ngOnInit() {
    this.fetchIdFromUrl();
    this.getCurrentMonument(this.monId);
    this.getAllAreas();

  }

  fetchIdFromUrl() {
    this._route.params.subscribe(params => {
      this.monId = params['id'];
      console.log('Found id in url is: ' + this.monId);
    });

    if (this.monId !== 'addmonument') {
      this.monumentFound = true;
    } else {
      this.monumentFound = false;
    }
  }

  getCurrentMonument(id: string) {
    this.monumentService.getMonumentById(id).subscribe(res => {
      this.currentMonument = res;
      this.returnCommonData.emit(this.currentMonument);
      console.log('Response is: ' + this.currentMonument.information[0].name);
    });
  }

  getAllAreas() {
    this.monumentService.getAreas().subscribe(data => {
      for (let i = 0; i <= (data.length - 1); i++) {
        this.areas.push(data[i]);
        console.log(data[i] + ' has been added.');
      }
    });
  }

  addArea() {
    this.areas.push((<HTMLInputElement>document.getElementById('areaInput')).value);
    document.getElementById('closeBtn').click();
  }

}
