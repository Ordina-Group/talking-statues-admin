import { ControllerService } from './../controller.service';
import { Monument, Information, Question } from './../model/monument';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-monument',
  templateUrl: './edit-monument.component.html',
  styleUrls: ['./edit-monument.component.css']
})
export class EditMonumentComponent implements OnInit {
  monumentForm: FormGroup;
  modalRef: BsModalRef
  monument:Monument;
  activeInfoObjectIndex:number=0;
  constructor(
    private controller:ControllerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    let id:String = this.route.snapshot.paramMap.get('id');
    this.controller.getOneMonument(id)
    .subscribe(monument => {
      this.monument=monument;
      this.buildForm();
    });
  }

  buildForm(){
    this.monumentForm = this.fb.group({
      information:this.fb.array([]),
      longitude:[this.monument.longitude, Validators.required ],
      latitude:[this.monument.latitude, Validators.required ],
      area:[this.monument.area, Validators.required ]
    });
    if (this.monument.information.length > 0){
      this.monumentForm.setControl("information",this.fb.array(this.monument.information
        .map(info=> this.mapInformationObjectToFormGroup(info))));
    }
  }
  
  openAddInformationModal(template: TemplateRef<any>) {
    this.addEmptyInformation();
    this.modalRef = this.modalService.show(template);
  }
  removeInformationObject(index){
    const informationArray = <FormArray>this.monumentForm.controls['information']
    informationArray.removeAt(index);
  }
  removeQuestionObject(index){
    const questionArray = <FormArray>this.monumentForm.controls['information']['controls'][this.activeInfoObjectIndex]['controls']['question']
    questionArray.removeAt(index);
  }
  addEmptyInformation(){
    const informationArray = <FormArray>this.monumentForm.controls['information'];
    informationArray.push(this.fb.group({
      language: "",
      name: "",
      description: "",
      question:this.fb.array([])
    }));
  }
  addEmptyQuestion(){
    const questionArray = <FormArray>this.monumentForm.controls['information']['controls'][this.activeInfoObjectIndex]['controls']['question']['controls'];
    questionArray.push(this.fb.group({
      question: "test",
      answer: "test"
    }));
  }

  mapInformationObjectToFormGroup(information:Information){
    return this.fb.group({
      language: information.language,
      name: information.name,
      description: information.description,
      question:this.fb.array(information.question
        .map(question=>this.mapQuestionObjectToFormGroup(question)))
    });
  }
  mapQuestionObjectToFormGroup(question:Question){
    return this.fb.group({
      question: question.question,
      answer: question.answer
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}