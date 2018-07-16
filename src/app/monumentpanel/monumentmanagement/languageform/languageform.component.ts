import { Component, Input, OnInit } from '@angular/core';
import { Information, Language } from '../../../../models/AppUser';

@Component({
  selector: 'app-languageform',
  templateUrl: './languageform.component.html',
  styleUrls: ['./languageform.component.css']
})
export class LanguageformComponent implements OnInit {

  @Input() infoArray: Information[];
  clickedInfo: Information[] = [];
  clickedLanguage: Language;
  constructor() { }

  ngOnInit() {
    console.log('received languageObject: ' , this.infoArray);
  }


  onLanguage(lang) {
    this.clickedLanguage = lang;
    for (let i = 0; i <= this.infoArray.length - 1; i++) {
      if (this.infoArray[i].language ===  this.clickedLanguage) {
        console.log('selected language is: ' , this.clickedLanguage);
        this.clickedInfo[0] = this.infoArray[i];
      }
    }
  }
}
