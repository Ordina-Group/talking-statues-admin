import { Component, Input, OnInit } from '@angular/core';
import { Information, Question } from '../../../../models/AppUser';

@Component({
  selector: 'app-languageform',
  templateUrl: './languageform.component.html',
  styleUrls: ['./languageform.component.css']
})
export class LanguageformComponent implements OnInit {

  @Input() infoArray: Information[];
  question: Question[] = [];
  constructor() { }

  ngOnInit() {
    console.log('received languageObject: ' , this.infoArray);
    this.questions();
  }

  questions() {
  }
}
