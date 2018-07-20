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

  monId: string;
  monumentData: Monument[] = [];
  monumentInformation: Information[] = [];

  submitMonument: Monument[] = [];

  monumentForm: FormGroup;

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

  onCommonFormReady(commonForm: FormGroup) {
    this.monumentForm = new FormGroup({
      commonForm
    });
  }

  onInformationFormReady(informationForm: FormGroup) {
    this.monumentForm.addControl('', informationForm);
  }

  submitForm() {
    console.log('saved commonData: ', this.monumentForm.value);
    this._monumentService.editMonument(this.monumentForm.value);

  }

}
