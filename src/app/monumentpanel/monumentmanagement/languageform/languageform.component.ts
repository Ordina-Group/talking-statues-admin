import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MonumentsService} from '../../../../services/monuments.service';
import {Information, Language, Monument} from '../../../../models/AppUser';
import {ActivatedRoute} from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-languageform',
  templateUrl: './languageform.component.html',
  styleUrls: ['./languageform.component.css']
})
export class LanguageformComponent implements OnInit {

  @Input() id: string;
  @Output() informationFormReady = new EventEmitter<FormGroup>();

  monumentData: Monument;
  monumentInformation: Information[];
  // newInfo: Information = {
  //   language: Language.DE,
  //   name: 'test',
  //   description: 'test',
  //   question: []
  // };
  monumentFound = false;
  enumLang: Language;

  informationForm: FormGroup;

  get information(): FormArray {
    return <FormArray>this.informationForm.get('information');
  }
  constructor(
    private monumentService: MonumentsService,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initializeInformationForm();
    this.inputId(this.id);
  }

  inputId(id) {
    console.log('id in commonForm: ', id);
    if (id !== 'addmonument') {
      this.monumentFound = true;
      this.monumentService.getMonumentById(id).subscribe(res => {
        this.monumentData = res;
        this.fillInformationForm(this.monumentData);
      });
    } else {
      this.monumentFound = false;
      this.initializeInformationForm();
    }
  }

  initializeInformationForm() {
    let informations: FormArray = new FormArray([]);

    this.informationForm = this.fb.group({
      information: informations,
    });
    this.informationFormReady.emit(this.informationForm.get('information').value);
    // console.log('info emitter: ', this.informationFormReady);
  }

  fillInformationForm(monument: Monument): void {
    if ( this.informationForm) {
      this.initializeInformationForm();
    }
    monument.information.map((info) => {
      (<FormArray>this.informationForm.get('information')).push(
          this.fb.group({
            language: info.language,
            name: info.name,
            description: info.description
          }));
    });
    this.informationFormReady.emit(this.informationForm);
    // console.log('information: ', this.informationForm.get('information').value);
  }

  buildInformation(): FormGroup {
    return this.fb.group({
      language: '',
      name: '',
      description: '',
    });
  }

  addInformation(information?: Information): void {
    this.information.push(this.buildInformation());
    this.informationFormReady.emit(this.informationForm.get('information').value);
  }

  deleteInformation(index: number): void {
    this.information.removeAt(index);
    this.informationFormReady.emit(this.informationForm.get('information').value);
  }

  // method needed to keep focus in current changing input field. a bug in case if you work with arrays.
  trackByFn(index: any, item: any) {
    return index;
}

  // addNewLanguage() {
  //   // this.newInfo = new Information();
  //   // this.newInfo.name = '';
  //   // this.newInfo.description = '';
  //   // this.newInfo.language = null;
  //   this.enumLang = null;
  //    document.getElementById('langCloseBtn').click();
  //    const lang = (<HTMLInputElement>document.getElementById('langInput')).value;
  //    console.log(lang);
  //
  //    switch (lang) {
  //      case 'NL' :
  //        this.enumLang = Language.NL;
  //        break;
  //      case 'EN' :
  //        this.enumLang = Language.EN;
  //        break;
  //      case 'FR' :
  //        this.enumLang = Language.FR;
  //        break;
  //      case 'DE' :
  //        this.enumLang = Language.DE;
  //        break;
  //      case 'ES' :
  //        this.enumLang = Language.ES;
  //        break;
  //    }
  //   (<HTMLInputElement>document.getElementById('langInput')).value = '';
  //   // this.newInfo.language = this.enumLang;
  //   //
  //   // this.monumentInformation.push(this.newInfo);
  //   // console.log('monumentInformation is: ' , this.monumentInformation);
  //   this.informationFormReady.emit(this.informationForm.get('information').value);
  // }


}
