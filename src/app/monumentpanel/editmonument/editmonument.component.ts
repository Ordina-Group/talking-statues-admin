import { Component, Input, OnInit } from '@angular/core';
import {MonumentsService} from '../../../services/monuments.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Information, Monument } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';
import { ActivatedRoute } from '@angular/router';
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-editmonument',
  templateUrl: './editmonument.component.html',
  styleUrls: ['./editmonument.component.css']
})
export class EditmonumentComponent implements OnInit {

  questions;
  editForm: FormGroup;
  info: Information;
  editData: Monument;
  sub: Subscription;

  constructor(
    private monumentService: MonumentsService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
  ) { }

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

  getMonument(id: string): void {
     this.monumentService.getMonumentById(id)
      .subscribe(
        (monument: Monument) => {
          this.onMonumentRetrieved(monument),
            console.log(monument.information.length);
        },
      );

  }

  onMonumentRetrieved(monument: Monument): void {
    if (this.editForm) {
      this.createForm();
    }
      this.editData = monument;
    console.log('information: ', this.editData.information[0]);
      this.editData.information.map((information: Information) => {
        this.info = information;
      });

      this.editForm.patchValue({
        name: this.info.name,
        description: this.info.description,
        latitude: monument.latitude,
        longitude: monument.longitude,
        area: monument.area,
        language: this.info.language
      });

      monument.information[0].question.map((question) => {
        (<FormArray>this.editForm.controls['questions']).push(
          this.fb.group({
            question: new FormControl(question.question)
          }));
      });

  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      }
    );
  }

  deleteQuestion(i: number): void {
    this.questions.removeAt(i);
  }

  addQuestion(): void {
    this.questions = this.editForm.get('questions') as FormArray;
    this.questions.push(this.createQuestion());
  }
  submitForm() {

  }

}
