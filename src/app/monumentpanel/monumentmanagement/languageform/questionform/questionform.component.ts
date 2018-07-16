import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionform',
  templateUrl: './questionform.component.html',
  styleUrls: ['./questionform.component.css']
})
export class QuestionformComponent implements OnInit {

  @Input() questionData;
  constructor() { }

  ngOnInit() {
    console.log('question data: ', this.questionData);
  }

}
