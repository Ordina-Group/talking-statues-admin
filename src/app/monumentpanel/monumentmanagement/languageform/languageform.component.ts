import { Component, Input, OnInit } from '@angular/core';
import { MonumentsService} from '../../../../services/monuments.service';
import {Information, Language, Monument} from '../../../../models/AppUser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-languageform',
  templateUrl: './languageform.component.html',
  styleUrls: ['./languageform.component.css']
})
export class LanguageformComponent implements OnInit {


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

  constructor(private monumentService: MonumentsService, private _route: ActivatedRoute) {
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
          console.log('Language: ' + res.information[i].language + ' has been added. Length is: ' + this.monumentInformation.length);
      }
    });
  }

  printMonInformation() {
    for (let i = 0; i <= this.monumentInformation.length - 1; i++) {
      console.log('Information Array contains: ' + this.monumentInformation[i].language + ' name: ' + this.monumentInformation[i].name);
    }
  }

  fetchIdFromUrl() {
    this._route.params.subscribe(params => {
      this.monId = params['id'];
      console.log('Found id in url is: ' + this.monId);
    });

    if (this.monId !== 'addmonument') {
      this.monumentFound = true;
    } else {
      this.monumentFound = false;
    }
  }

  addNewLanguage() {

     document.getElementById('langCloseBtn').click();
  }
}
