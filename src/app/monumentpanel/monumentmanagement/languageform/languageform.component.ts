import { Component, Input, OnInit } from '@angular/core';
import {Information, Language, Question} from '../../../../models/AppUser';

@Component({
  selector: 'app-languageform',
  templateUrl: './languageform.component.html',
  styleUrls: ['./languageform.component.css']
})
export class LanguageformComponent implements OnInit {

  questions: Question[] = [];

  @Input() languageObject: Information[];
  constructor() { }

  ngOnInit() {
    console.log('received languageObject: ' , this.languageObject);
  }

  getQuestions() {

  }
}
