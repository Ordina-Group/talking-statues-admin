import { Component, Input, OnInit } from '@angular/core';
import {MonumentsService} from '../../../services/monuments.service';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Information, Monument, Question } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';
import { ActivatedRoute, Router } from '@angular/router';
import index from '@angular/cli/lib/cli';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-editmonument',
  templateUrl: './editmonument.component.html',
  styleUrls: ['./editmonument.component.css']
})
export class EditmonumentComponent implements OnInit {

  language = [];
  editForm: FormGroup;
  info: Information;
  editData: Monument;
  sub: Subscription;
  monumentInformation = [];
  clickedLanguage: string;
  foundInfo: Information;
  title: Information;


  get questions(): FormArray {
    return <FormArray>this.editForm.get('questions');
  }

  constructor(
    private monumentService: MonumentsService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    this.sub = this._route.params.subscribe(params => {
      const id: string = params['id'];
      this.getMonument(id);
    });
  }

  fillForm(monument) {
    this.title = monument.name;
    console.log(this.title);
    this.editForm.reset();
    this.questions.reset();
    this.createQuestions().reset();
    this.monumentInformation = [];
    console.log(monument);
        this.editForm.patchValue({
          name: monument.name,
          description: monument.description,
          latitude: this.editData.latitude,
          longitude: this.editData.longitude,
          area: this.editData.area,
          language: monument.language
        });
        this.monumentInformation.push(monument);
        console.log('monument: ', this.monumentInformation);

        monument.question.map((question) => {
          // populate the questions array if there are existing questions from database
          (<FormArray>this.editForm.controls['questions']).push(
            this.fb.group({
              question: [question.question],
              answer: [question.answer]
            }));
          console.log(question.answer);
        });
  }

  createForm() {
    const questions: FormArray = new FormArray([]);

    this.editForm = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
      questions: questions,
      latitude: new FormControl(),
      longitude: new FormControl(),
      area: new FormControl(),
    });
  }

  onLanguage(lang) {
    console.log('i clicked on language: ', lang);
    this.clickedLanguage = lang;
    for (let i = 0; i <= this.editData.information.length - 1; i++) {
      if (this.editData.information[i].language === this.clickedLanguage) {
        this.foundInfo = this.editData.information[i];
      }
    }
    this.fillForm(this.foundInfo);
  }

  createQuestions(): FormGroup {
    return this.fb.group({
        question: [''],
        answer: [''],
      });
  }


  onMonumentRetrieved(monument: Monument): void {
    this.editData = monument;
    console.log(monument);
    console.log(monument.information);

    this.language = [];
    monument.information.map((info: Information) => {
      this.info = info;
      console.log('language is: ' + info.language);
      this.language.push(this.info.language);
    });
    //
    // this.monumentInformation = [];
    // if (this.editForm) {
    //   this.createForm();
    // }
    // this.fillForm(monument);
  }


  addQuestion(question?: Question): void {
    this.questions.push( this.createQuestions());
  }

  deleteQuestion(i: number): void {
    this.questions.removeAt(i);
  }

  submitForm() {
    console.log(this.editForm.value);
    if (this.editForm.dirty && this.editForm.valid) {
      const r = Object.assign({}, this.editData, this.editForm.value);

      this.monumentService.editMonument(r)
        .subscribe(
          () => this.onSaveComplete(),
        );
    } else if (!this.editForm.dirty) {
      this.onSaveComplete();
    }
  }

  getMonument(id: string): void {
    this.monumentService.getMonumentById(id)
      .subscribe(
        (monument: Monument) => {
          this.onMonumentRetrieved(monument);
        },
      );
  }

  onSaveComplete() {
    // this._router.navigate(['/monuments']);
  }

}
