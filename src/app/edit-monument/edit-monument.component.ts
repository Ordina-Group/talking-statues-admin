import { ControllerService } from './../controller.service';
import { Monument, MonumentImage, Information, Question, Language } from './../model/monument';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-monument',
  templateUrl: './edit-monument.component.html',
  styleUrls: ['./edit-monument.component.css']
})
export class EditMonumentComponent implements OnInit {
  monumentForm: FormGroup;
  modalRef: BsModalRef;
  monument: Monument;
  monumentImage: string;
  activeInfoObjectIndex: number = 0;
  posibleLanguages: string[];
  public uploader: FileUploader;
  constructor(
    private controller: ControllerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router) {}

  ngOnInit() {
    console.log('Entering ngOnInit...');
    if (this.route.snapshot.url.map(i => i.path).includes('add')) {
      this.monument = new Monument();
      this.buildEmptyForm();
    } else {
      const id: string = this.route.snapshot.paramMap.get('id');
      console.log('Entering ngOnInit: First subscribe...');
      this.controller.getOneMonument(id).subscribe(monument => {
        this.monument = monument;
        this.buildForm();
        this.posibleLanguages = this.getPosibleLanguages();
        this.uploader = new FileUploader({
          url: environment.baseUrl + '/monuments/' + this.monument.id + '/image',
          disableMultipart: false,
          autoUpload: true
        });
      });
      console.log('Entering ngOnInit: Image subscribe...');
      this.controller.getOneMonumentImage(id).subscribe(image => {
        this.monumentImage = 'data:image/png;base64,' + image.content;
      });
    }

  }

  buildEmptyForm() {
    this.monumentForm = this.fb.group({
      information: this.fb.array([]),
      longitude: ['', Validators.required ],
      latitude: ['', Validators.required ],
      area: ['', Validators.required ]
    });
  }
  buildForm() {
    this.monumentForm = this.fb.group({
      information: this.fb.array([]),
      longitude: [this.monument.longitude, Validators.required ],
      latitude: [this.monument.latitude, Validators.required ],
      area: [this.monument.area, Validators.required ]
    });
    if (this.monument.information.length > 0) {
      this.monumentForm.setControl('information', this.fb.array(this.monument.information
        .map(info => this.mapInformationObjectToFormGroup(info))));
    }
  }

  removeInformationObject(index) {
    (<FormArray>this.monumentForm.controls['information'])
    .removeAt(index);
    this.activeInfoObjectIndex = 0;
  }
  removeQuestionObject(index) {
    (<FormArray>this.monumentForm.controls['information']['controls'][this.activeInfoObjectIndex]['controls']['question'])
    .removeAt(index);
  }
  addQuestion(questionForm: FormGroup) {
    this.monumentForm.controls['information']['controls'][this.activeInfoObjectIndex]['controls']['question']
    .push(questionForm);
  }
  addInformation(informationForm: FormGroup) {
    (<FormArray>this.monumentForm.controls['information'])
    .push(informationForm);
  }

  mapInformationObjectToFormGroup(information: Information) {
    return this.fb.group({
      language: information.language,
      name: information.name,
      description: information.description,
      question: information.question != null ? this.fb.array(information.question
        .map(question => this.mapQuestionObjectToFormGroup(question))) : []
    });
  }
  mapQuestionObjectToFormGroup(question: Question) {
    return this.fb.group({
      question: question.question,
      answer: question.answer
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openAddQuestionModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getPosibleLanguages() {
    const informationArray = <FormArray>this.monumentForm.controls['information'];
    const usedLang: String[] = informationArray.controls.map(contr => contr.get('language').value);
    return Object.keys(Language).filter(lang => !usedLang.includes(lang));
  }

  save() {
    if (!this.route.snapshot.url.map(i => i.path).includes('add')) {
      this.controller.saveMonument(this.monumentForm, this.monument).subscribe(res => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.controller.addMonument(this.monumentForm).subscribe(res => {
        this.router.navigate(['/dashboard']);
      });
    }

  }
  onFileChanged(event: any) {
    this.uploader.response.subscribe(res => {
    });
  }
}
