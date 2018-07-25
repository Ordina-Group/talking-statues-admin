import { Component, Input, OnInit } from '@angular/core';
import { MonumentsService } from '../../../services/monuments.service';
import { ActivatedRoute } from '@angular/router';
import { Information, Monument, Question } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-monumentmanagement',
  templateUrl: './monumentmanagement.component.html',
  styleUrls: ['./monumentmanagement.component.css']
})
export class MonumentmanagementComponent implements OnInit {

  monumentID: string;
  monumentFound = false;
  areas: String[] = [];
  monument: Monument;
  informationQuestions: Question[] = [];


  data = {
    id: '123344566',
    latitude: '',
    longitude: '',
    area: '',
    information: [
      {
        language: 'EN',
        name: 'name',
        description: 'description',
        question: [
          {
            question: 'example question',
            answer: 'example answer'
          }
        ]
      }
    ]
  };
  monumentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _monumentService: MonumentsService,
    private _route: ActivatedRoute,
  ) {
    this.monumentForm = this.fb.group({
      information: this.fb.array([])
    });
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
          this.monumentID = params['id'];
        });
        this.initializeMonumentForm();
        this.getAllAreas();
        this.inputId(this.monumentID);
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

  inputId(id) {
    if (id !== 'addmonument') {
      this.monumentFound = true;
      this._monumentService.getMonumentById(id).subscribe(res => {
        this.monument = res;

        this.fillForm(this.monument);
      });
    } else {
      this.monumentFound = false;
      this.initializeMonumentForm();
    }
  }

  fillForm(monument) {
    this.monumentForm = this.fb.group({
      id: [monument ? monument.id : ''],
      latitude: [monument ? monument.latitude : ''],
      longitude: [monument ? monument.longitude : ''],
      area: [monument ? monument.area : ''],
      information: this.fb.array([])
    });
    this.setLanguages();
  }

  initializeMonumentForm() {
    this.monumentForm = this.fb.group({
      id: [''],
      latitude: [''],
      longitude: [''],
      area: this.areas,
      information: this.fb.array([])
    });
  }
  addNewLanguage() {
    let control = <FormArray>this.monumentForm.controls.information;
    control.push(
      this.fb.group({
        language: [''],
        name: [''],
        description: [''],
        question: this.fb.array([])
      })
    );
  }

  deleteLanguage(index) {
    let control = <FormArray>this.monumentForm.controls.information;
    control.removeAt(index);
  }

  addnewQuestion(control) {
    control.push(
      this.fb.group({
        question: [''],
        answer: ['']
      }));
  }

  deleteQuestion(control, index) {
    control.removeAt(index);
  }

  setLanguages() {
    let control = <FormArray>this.monumentForm.controls.information;
    this.monument.information.forEach(x => {
      control.push(this.fb.group({
        language: x.language,
        name: x.name,
        description: x.description,
        question: this.setQuestions(x) }));
    });
  }

  setQuestions(x) {
    let arr = new FormArray([])
    x.question.forEach(y => {
      arr.push(this.fb.group({
        question: y.question ,
        answer: y.answer
      }));
    });
    return arr;
  }

  // method needed to keep focus in current changing input field. a bug in case if you work with arrays.
  trackByFn(index: any, item: any) {
    return index;
  }

  submitForm() {
    if (this.monumentForm.get('area').touched) {
      // console.log('saved Data: ', this.monumentForm.value);
      this._monumentService.editMonument(this.monumentForm.value).subscribe( _ => {
        console.log('Making call to endpoint editMonument');
      });
    }
  }
}
