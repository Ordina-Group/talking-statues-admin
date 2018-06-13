import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Language } from '../../model/monument';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.css']
})
export class InformationModalComponent implements OnInit {
  @Input() modalRef:BsModalRef;
  @Input() oldInformation:FormGroup;
  @Output() save = new EventEmitter<FormGroup>();
  informationForm:FormGroup;
  posibleLanguages:string[];

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.posibleLanguages=this.getPosibleLanguages();
    this.informationForm=this.emptyInformation();
    if(this.oldInformation!=null){
      this.informationForm.setValue(this.oldInformation.value);
    }
  }

  emptyInformation():FormGroup{
    return this.fb.group({
      language: '',
      name: '',
      description:'',
      question:this.fb.array([])
    });
  }

  saveInformation(){
    if(this.oldInformation!=null){
      this.oldInformation.setValue(this.informationForm.value);
    }
    this.save.emit(this.informationForm);
    this.modalRef.hide();
  }

  getPosibleLanguages(){
    return Object.keys(Language);
  }

}
