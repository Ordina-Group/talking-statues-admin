import { Component, Input, OnInit } from '@angular/core';
import { Information, Language, Question } from '../../../../models/AppUser';

@Component({
  selector: 'app-languageform',
  templateUrl: './languageform.component.html',
  styleUrls: ['./languageform.component.css']
})
export class LanguageformComponent implements OnInit {

  @Input() infoArray: Information[];
  question: Question[] = [];
  language: String;
  constructor() { }

  ngOnInit() {
    console.log('received languageObject: ' , this.infoArray);
    this.questions();
    this.getLanguage();
  }

  questions() {
  }

  getLanguage() {
      this.infoArray.map((lang) => {
        this.language = lang.language;
        console.log('monument language object: ', this.language);
      });
    }
}
