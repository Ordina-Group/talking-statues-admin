import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MonumentsService} from '../../../../services/monuments.service';
import {Information, Language, Monument} from '../../../../models/AppUser';
import {ActivatedRoute} from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-languageform',
  templateUrl: './languageform.component.html',
  styleUrls: ['./languageform.component.css']
})
export class LanguageformComponent implements OnInit {

  @Output() informationFormReady = new EventEmitter<FormGroup>();

  monumentInformation: Information[] = [];
  currentMonument: Monument;
  newInfo: Information = {
    language: Language.DE,
    name: 'test',
    description: 'test',
    question: []
  };
  monId: string;
  monumentFound = false;
  enumLang: Language;

  informationForm = new FormGroup ({
  });

  get information(): FormArray {
    return <FormArray>this.informationForm.get('information');
  }
  constructor(
    private monumentService: MonumentsService,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.monumentInformation = [];
    this.fetchIdFromUrl();
    this.getMonumentInformation();
    this.printMonInformation();
  }

  ngOnInit() {

  }

  getMonumentInformation() {
    this.monumentService.getMonumentById(this.monId).subscribe(res => {
      this.currentMonument = res;
      for (let i = 0; i <= (res.information.length - 1); i++) {
          this.monumentInformation.push(res.information[i]);
          console.log('Language: '
            + res.information[i].language + ' has been added. Length is: ' + this.monumentInformation.length);
      }
      if (res.information) {
        this.fillInformationForm(res);
      } else {
        this.initializeCommonForm();
      }
      // console.log('monumentInformation is: ' , this.monumentInformation);
    });
  }

  fillInformationForm(monument: Monument): void {

    monument.information.map((information) => {
      (<FormArray>this.informationForm.controls['information']).push(
        this.fb.group({
          language: information.language,
          name: information.name,
          description: information.description
        }));
      console.log('information form value: ', this.informationForm.controls['information'].value);
    });


    // console.log('information[] : ', information);
    // for ( let i = 0; i <= information.length; i++) {
    //   this.informationForm.patchValue({
    //     name: information[i].name,
    //     description: information[i].description,
    //     language: information[i].language
    //   });
    //   console.log('information form value: ', this.informationForm.value);
    //   this.informationFormReady.emit(this.informationForm);
    // }
  }

  buildInformation(): FormGroup {
    return this.fb.group({
      language: [''],
      name: [''],
      description: [''],
    });
  }

  printMonInformation() {
    for (let i = 0; i <= this.monumentInformation.length - 1; i++) {
      console.log('Information Array contains: '
        + this.monumentInformation[i].language + ' name: ' + this.monumentInformation[i].name);
    }
  }

  fetchIdFromUrl() {
    this._route.params.subscribe(params => {
      this.monId = params['id'];
      // console.log('Found id in url is: ' + this.monId);
    });

    if (this.monId !== 'addmonument') {
      this.monumentFound = true;
    } else {
      this.monumentFound = false;
    }
  }

  addNewLanguage() {
    this.newInfo = new Information();
    this.newInfo.name = '';
    this.newInfo.description = '';
    this.newInfo.language = null;
    this.enumLang = null;
     document.getElementById('langCloseBtn').click();
     const lang = (<HTMLInputElement>document.getElementById('langInput')).value;
     console.log(lang);

     switch (lang) {
       case 'NL' :
         this.enumLang = Language.NL;
         break;
       case 'EN' :
         this.enumLang = Language.EN;
         break;
       case 'FR' :
         this.enumLang = Language.FR;
         break;
       case 'DE' :
         this.enumLang = Language.DE;
         break;
       case 'ES' :
         this.enumLang = Language.ES;
         break;
     }
    (<HTMLInputElement>document.getElementById('langInput')).value = '';
    this.newInfo.language = this.enumLang;

    this.monumentInformation.push(this.newInfo);
    console.log('monumentInformation is: ' , this.monumentInformation);
    this.informationFormReady.emit(this.informationForm);
  }

  initializeCommonForm() {
    let informationObjects: FormArray = new FormArray([]);

    this.informationForm = this.fb.group({
      information: informationObjects
    });
    this.informationFormReady.emit(this.informationForm);
  }
}
