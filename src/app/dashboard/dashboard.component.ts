import { Monument, Language, Information } from './../model/monument';
import { ControllerService } from './../controller.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  auth:boolean;
  name:String;
  monuments:Monument[];
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private controller:ControllerService) { 

  }

  ngOnInit() {
    this.controller.getAllMonuments().subscribe(monuments => this.monuments = monuments);
    this.auth=false;
    this.controller.checkAuthentication().subscribe(user => {
      this.auth = true
      this.name = user;
    })
  }
  openModal(template: TemplateRef<any>) {
    this.ngOnInit();
    
    this.modalRef = this.modalService.show(template);
  }
  getPosibleLanguages(){
    return Object.keys(Language)
  }
  getMonumentInformationForLanguage(monument: Monument,language:String):Information{
    let details =  monument.information.filter(details => details.language == language);
    if(details.length!=0){
      return details[0];
    }
    else{
      return new Information();
    }
  }

}
