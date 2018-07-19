import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Information, Monument} from '../../../../models/AppUser';
import {MonumentsService} from '../../../../services/monuments.service';
import {ActivatedRoute} from '@angular/router';
import {MonumentmanagementComponent} from '../monumentmanagement.component';

@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrls: ['./commonform.component.css']
})
export class CommonformComponent implements OnInit, AfterViewInit {

  @Output() returnCommonData = new EventEmitter<Monument>();
  monId: string;
  currentMonument: Monument;
  returnMonument: Monument;
  monumentFound = false;
  areas: String[] = [];

  lat: number;
  long: number;


  constructor(private _route: ActivatedRoute, private monumentService: MonumentsService) {

  }

  ngOnInit() {
    this.fetchIdFromUrl();
    this.getCurrentMonument(this.monId);
    this.getAllAreas();
  }

  ngAfterViewInit() {
    this.returnMonument = this.currentMonument;
    const latStr = (<HTMLInputElement>document.getElementById('latitude')).value;
    const longStr = (<HTMLInputElement>document.getElementById('longitude')).value;
    this.returnMonument.latitude = Number(latStr);
    this.returnMonument.longitude = Number(longStr);

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
      console.log('Response is: ' + this.currentMonument.information[0].name);


      this.returnCommonData.emit(this.currentMonument);

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
