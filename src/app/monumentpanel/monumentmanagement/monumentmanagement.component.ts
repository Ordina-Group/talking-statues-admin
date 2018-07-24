import { Component, Input, OnInit } from '@angular/core';
import { MonumentsService } from '../../../services/monuments.service';
import { ActivatedRoute } from '@angular/router';
import { Information, Monument } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-monumentmanagement',
  templateUrl: './monumentmanagement.component.html',
  styleUrls: ['./monumentmanagement.component.css']
})
export class MonumentmanagementComponent implements OnInit {

  monumentID: string;
  monument: Monument;
  monumentFound = false;
  areas: String[] = [];
  submitMonument: Monument;

  monumentForm: FormGroup;

  @Input() returnData;

  get information(): FormArray {
    return <FormArray>this.monumentForm.get('information');
  }

  constructor(
    private _fb: FormBuilder,
    private _monumentService: MonumentsService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.monumentID = params['id'];
    });
    this.initializeMonumentForm();
    this.getAllAreas();
    this.inputId(this.monumentID);
    this.onChanges();
  }

  inputId(id) {
    if (id !== 'addmonument') {
      this.monumentFound = true;
      this._monumentService.getMonumentById(id).subscribe(res => {
        this.monument = res;
        this.fillMonumentForm(this.monument);
      });
    } else {
      this.monumentFound = false;
      this.initializeMonumentForm();
    }
  }

  fillMonumentForm(monument) {
    console.log('information: ', this.information);
    this.monumentForm.patchValue({
      latitude: monument.latitude,
      longitude: monument.longitude,
      area: [this.areas, Validators.required],
      id: monument.id,
    });
    monument.information.map((info) => {
      (<FormArray>this.monumentForm.get('information')).push(
        this._fb.group({
          language: info.language,
          name: info.name,
          description: info.description
        }));
    });
  }

  onChanges() {
    this.monumentForm.valueChanges.subscribe(val => {
      this.monumentForm.patchValue(val, {emitEvent: false});
    });
  }

  getAllAreas() {
    this._monumentService.getAreas().subscribe(data => {
      for (let i = 0; i <= (data.length - 1); i++) {
        this.areas.push(data[i]);
        // console.log(data[i] + ' has been added.');
      }
    });
  }

  addArea() {
    this.areas.push((<HTMLInputElement>document.getElementById('areaInput')).value);
    document.getElementById('closeBtn').click();
  }

  buildInformation(): FormGroup {
    return this._fb.group({
      language: '',
      name: '',
      description: '',
    });
  }

  addInformation(information?: Information): void {
    this.information.push(this.buildInformation());
  }

  deleteInformation(index: number): void {
    this.information.removeAt(index);
  }

  // method needed to keep focus in current changing input field. a bug in case if you work with arrays.
  trackByFn(index: any, item: any) {
    return index;
  }


  initializeMonumentForm() {
    let information: FormArray = new FormArray([]);

    this.monumentForm = this._fb.group({
      id: [''],
      latitude: [''],
      longitude: [''],
      area: [''],
      information: information
    });
  }
  submitForm() {
    if (this.monumentForm.get('area').touched) {
      console.log('saved Data: ', this.monumentForm.value);
      // this._monumentService.editMonument(this.monumentForm.value).subscribe( _ => {
      //   console.log('Making call to endpoint editMonument');
      // });
    }
  }

}
