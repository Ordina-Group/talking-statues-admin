import { Component, Input, OnInit } from '@angular/core';
import { MonumentsService } from '../../../services/monuments.service';
import { ActivatedRoute } from '@angular/router';
import { Information, Monument } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-monumentmanagement',
  templateUrl: './monumentmanagement.component.html',
  styleUrls: ['./monumentmanagement.component.css']
})
export class MonumentmanagementComponent implements OnInit {

  monumentID: string;
  monument;
  information;
  submitMonument: Monument;

  monumentForm: FormGroup;

  @Input() returnData;

  constructor(
    private _monumentService: MonumentsService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.monumentID = params['id'];
    });
  }

  onCommonFormReady(commonForm: FormGroup) {
    this.monumentForm = new FormGroup({
      commonForm
    });
  }

  onInformationFormReady(informationForm: FormGroup) {
    console.log('returned informationObjects: ', informationForm);
    // this.monumentForm = new FormGroup({
    //   informationForm
    // });
  }

  submitForm() {
    // let information = new FormGroup({
    //   language: this.information.language,
    //   name: this.information.name,
    //   description: this.information.description,
    // });
    //
    // this.monumentForm = new FormGroup({
    //   area: this.monument.area,
    //   id: this.monument.id,
    //   latitude: this.monument.latitude,
    //   longitude: this.monument.longitude,
    //   information : information
    // });
    console.log('saved commonData: ', this.monumentForm.value);
    // this._monumentService.editMonument(this.monumentForm.value);

  }

}
