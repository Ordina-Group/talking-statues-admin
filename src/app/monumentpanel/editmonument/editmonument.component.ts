import { Component, Input, OnInit } from '@angular/core';
import {MonumentsService} from '../../../services/monuments.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  dbQuestion: Question;
  editForm: FormGroup;
  info: Information;
  editData: Monument;
  sub: Subscription;
  monumentInformation = [];

  constructor(
    private monumentService: MonumentsService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  get questions(): FormArray {
    return <FormArray>this.editForm.get('questions');
  }

  ngOnInit() {
    this.createForm();
    this.sub = this._route.params.subscribe(params => {
      const id: string = params['id'];
      this.getMonument(id);
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

  createQuestions(): FormGroup {
    return this.fb.group({
        question: [''],
        answer: [''],
      }
    );
  }

  getMonument(id: string): void {
     this.monumentService.getMonumentById(id)
      .subscribe(
        (monument: Monument) => {
          this.onMonumentRetrieved(monument);
        },
      );
  }

  onMonumentRetrieved(monument: Monument): void {
    this.monumentInformation = [];
    if (this.editForm) {
      this.createForm();
    }
      this.editData = monument;
      this.editData.information.map((information: Information) => {
        this.info = information;
        console.log('information is: ' + information.language);
        this.monumentInformation.push(information);
        console.log('monument information', this.monumentInformation);
        console.log('question :', this.info.question);

        // populate the questions array if there are existing questions from database
        (<FormArray>this.editForm.controls['questions']).push(
          this.fb.group({
            question: new FormControl(information.question.map(q => q.question)),
            answer: new FormControl(information.question.map(q => q.answer))
          }));

        this.editForm.patchValue({
          name: this.info.name,
          description: this.info.description,
          latitude: monument.latitude,
          longitude: monument.longitude,
          area: monument.area,
          language: this.info.language
        });
      });

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
      let r = Object.assign({}, this.editData, this.editForm.value);

      this.monumentService.editMonument(r)
        .subscribe(
          () => this.onSaveComplete(),
        );
    } else if (!this.editForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete() {
    this._router.navigate(['/monuments']);
  }

}
