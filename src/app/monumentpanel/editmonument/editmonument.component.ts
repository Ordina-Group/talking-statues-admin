import { Component, Input, OnInit } from '@angular/core';
import {MonumentsService} from '../../../services/monuments.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Information, Monument, Question } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';
import { ActivatedRoute } from "@angular/router";

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
      name: '',
      description: '',
      questions: questions,
      latitude: '',
      longitude: '',
      area: '',
    });
  }

  getMonument(id: string): void {
     this.monumentService.getMonumentById(id)
      .subscribe(
        (monument: Monument) => this.onMonumentRetrieved(monument),
      );
  }

  onMonumentRetrieved(monument: Monument): void {
    if (this.editForm) {
      this.createForm();
    }
    this.editData = monument;
    this.editData.information.map((information: Information) => {
      this.info = information;
    });
    console.log(this.info);
    this.editForm.patchValue({
      name: this.info.name,
      description: this.info.description,
      latitude: monument.latitude,
      longitude: monument.longitude,
      area: monument.area,
      language: this.info.language
    });

    monument.information[1].question.map((question) => {
      (<FormArray>this.editForm.controls['questions']).push(
        this.fb.group({
          question: [question.question]
        }));
    });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      }
    );
  }

  addQuestion(): void {
    this.questions = this.editForm.get('questions') as FormArray;
    this.questions.push(this.createQuestion());
  }

  submitForm() {

  }

}
