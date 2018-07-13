import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/index';
import {Information, Language, Monument, Question} from '../../../models/AppUser';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MonumentsService} from '../../../services/monuments.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addmonument',
  templateUrl: './addmonument.component.html',
  styleUrls: ['./addmonument.component.css']
})
export class AddmonumentComponent implements OnInit {

  language = [];
  editForm: FormGroup;
  info: Information;
  editData: Monument;
  sub: Subscription;
  monumentInformation: Information[] = [];
  clickedLanguage: string;
  foundInfo: Information;
  title: Information;
  areas: String[] = [];


  get questions(): FormArray {
    return <FormArray>this.editForm.get('question');
  }


  constructor(
    private monumentService: MonumentsService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {  }


  ngOnInit() {
    this.createForm();
    this.sub = this._route.params.subscribe(params => {
      const id: string = params['id'];
      this.getMonument(id);
    });
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

  createForm() {
    const questions: FormArray = new FormArray([]);
    this.editForm = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
      question: questions,
      latitude: new FormControl(),
      longitude: new FormControl(),
      area: new FormControl(),
      language: '',
    });
  }


  getMonument(id: string): void {
    this.monumentService.getMonumentById(id)
      .subscribe(
        (monument: Monument) => {
          this.onMonumentRetrieved(monument);

        },
      );
  }

  // form shows when clicking a language button, from the data of the monument.
  onLanguage(lang) {
    // console.log('data: ', this.editData.information);
    this.clickedLanguage = lang;
    for (let i = 0; i <= this.editData.information.length - 1; i++) {
      // console.log('Clicked language is: ' + lang + ' == editData.information.language is: ' + this.editData.information[i].language );
      if (this.editData.information[i].language ===  this.clickedLanguage) {
        this.foundInfo = this.editData.information[i];
        this.fillForm(this.foundInfo);
      }
    }
  }


  fillForm(monument) {
    // clear all used form values from previous clicked language button.
    this.title = monument.name;
    this.editForm.reset();
    this.questions.controls = [];

    this.monumentInformation = [];
    // populate the form with the data where language is the clicked language.
    this.editForm.patchValue({
      name: monument.name,
      description: monument.description,
      latitude: this.editData.latitude,
      longitude: this.editData.longitude,
      area: this.editData.area,
      language: monument.language
    });
    this.monumentInformation.push(monument);

    if (monument.question) {
      // in case if their are questions from the db, populate the dynamic question formArray.
      monument.question.map((question) => {
        // populate the questions array if there are existing questions from database
        (<FormArray>this.editForm.controls['question']).push(
          this.fb.group({
            question: [question.question],
            answer: [question.answer]
          }));
      });
    }
  }


  onMonumentRetrieved(monument: Monument): void {
    this.editData = monument;
    this.language = [];
    monument.information.map((info: Information) => {
      this.info = info;
      this.language.push(this.info.language);
      // form will be populated in case if admin didnt clicked on the language tab.
      this.fillForm(this.info);
    });
  }


  addQuestion(question?: Question): void {
    this.questions.push( this.createQuestions());
  }


  createQuestions(): FormGroup {
    return this.fb.group({
      question: [''],
      answer: [''],
    });
  }


  deleteQuestion(i: number): void {
    this.questions.removeAt(i);
  }

  addLanguage(language?: Language): void {
    this.language.push(this.createLanguage().controls['language'].value);
    this.editData.information.push(this.createLanguage().value);
    console.log(this.language);
    console.log(this.monumentInformation);
    (<HTMLInputElement>document.getElementById('newLanguage')).value = '';

  }

  createLanguage() {
    const questions: FormArray = new FormArray([]);
    return this.fb.group({
      name: '',
      description: '',
      question: questions,
      language: (<HTMLInputElement>document.getElementById('newLanguage')).value,
    });
  }


  submitForm() {
    // console.log(this.editForm.value);
    // if (this.editForm.dirty && this.editForm.valid) {
    //   const r = Object.assign({}, this.editData, this.editForm.value);
    //
    //   this.monumentService.editMonument(r)
    //     .subscribe(
    //       () => this.onSaveComplete(),
    //     );
    // } else if (!this.editForm.dirty) {
    //   this.onSaveComplete();
    // }


  }


  onSaveComplete() {
    this._router.navigate(['/monuments']);
  }

  ngAfterViewInit(): void {
    document.getElementById('NL-tab').click();
  }

}
