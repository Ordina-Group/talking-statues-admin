import { Component, Input, OnInit } from '@angular/core';
import { MonumentsService } from '../../../services/monuments.service';
import { ActivatedRoute } from '@angular/router';
import { Information, Monument } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-monumentmanagement',
  templateUrl: './monumentmanagement.component.html',
  styleUrls: ['./monumentmanagement.component.css']
})
export class MonumentmanagementComponent implements OnInit {

  monumentID: string;
  monument: Monument;
  information: Information[];
  submitMonument: Monument;

  monumentForm: FormGroup;

  @Input() returnData;

  constructor(
    private _fb: FormBuilder,
    private _monumentService: MonumentsService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.monumentID = params['id'];
    });
    this.createMonumentForm();
    this.onChanges();
    this.monumentForm.patchValue({
      common: [this.monument.id]
    });
  }

  onChanges() {
    this.monumentForm.valueChanges.subscribe(val => {
      this.monumentForm.patchValue(val, {emitEvent: false});
    });
  }

  createMonumentForm() {
    this.monumentForm = this._fb.group({
      common: this._fb.group({}),
      info: this._fb.group({})
    });
  }

  // onCommonFormReady(commonForm: FormGroup) {
  //   console.log(commonForm);
  //   this.monumentForm = new FormGroup({
  //     commonForm
  //   });
  // }

  onInformationFormReady(informationForm: Information) {
    console.log('returned informationObjects: ', informationForm);
  }

  submitForm() {
    console.log('saved commonData: ', this.monumentForm.value);
    // this._monumentService.editMonument(this.monumentForm.value);

  }

}
