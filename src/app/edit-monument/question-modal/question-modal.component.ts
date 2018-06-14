import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent implements OnInit {

  @Input() modalRef:BsModalRef;
  @Input() oldQuestion:FormGroup;
  @Output() save = new EventEmitter<FormGroup>();
  questionForm:FormGroup;

  constructor(private fb:FormBuilder) {}
  ngOnInit() {
    this.questionForm=this.emptyQuestion();
    if(this.oldQuestion!=null){
      this.questionForm.setValue(this.oldQuestion.value);
    }
  }

  emptyQuestion():FormGroup{
    return this.fb.group({
      question: '',
      answer: ''
    });
  }

  saveQuestion(){
    if(this.oldQuestion!=null){
      this.oldQuestion.setValue(this.questionForm.value);
    }
    this.save.emit(this.questionForm);
    this.modalRef.hide();
  }
}
 