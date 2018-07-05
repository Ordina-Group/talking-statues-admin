import { Component, Input, OnInit } from '@angular/core';
import {MonumentsService} from '../../../services/monuments.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Information, Monument } from '../../../models/AppUser';
import { Subscription } from 'rxjs/index';
import { ActivatedRoute } from '@angular/router';
import index from '@angular/cli/lib/cli';
import { forEach } from "@angular/router/src/utils/collection";

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
  monumentInformation = [];

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
        (<FormArray>this.editForm.controls['questions']).push(
          this.fb.group({
            question: new FormControl(information.question)
          }));

        // this.editForm.patchValue({
        //   name: this.info.name,
        //   description: this.info.description,
        //   latitude: monument.latitude,
        //   longitude: monument.longitude,
        //   area: monument.area,
        //   language: this.info.language
        // });


        // for (let i = 0; i <= this.monumentInformation.length - 1; i++) {
        //   console.log('array value ' + i  + '= ', Object.values(this.monumentInformation[i]));
        //   console.log('Monument language is: ' + this.monumentInformation[i].language);
        //   // (<FormArray>this.editForm.controls['questions']).push(
        //   //   this.fb.group({
        //   //     question: new FormControl(this.monumentInformation[i].language)
        //   //   }));
        //
        //   // this.monumentInformation[i].question.map((question) => {
        //   //   console.log('Monument language is: ' + this.monumentInformation[i].language);
        //   //   (<FormArray>this.editForm.controls['questions']).push(
        //   //     this.fb.group({
        //   //       question: new FormControl(question.question)
        //   //     }));
        //   // });
        // }
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
