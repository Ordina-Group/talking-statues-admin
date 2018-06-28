import { Monument, Language, Information } from './../model/monument';
import { ControllerService } from './../controller.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  auth: boolean;
  name: String;
  monuments: Monument[];
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private controller: ControllerService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.controller.getAllMonuments().subscribe(monuments => this.monuments = monuments);
    this.auth=false;
  }

  openModal(template: TemplateRef<any>) {
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
      return new Information()
    }
  }
  removeMonument(monument:Monument){
    this.controller.removeMonument(monument).subscribe(res => {
      let index = this.monuments.indexOf(monument, 0);
      if (index > -1) {
        this.monuments.splice(index, 1);
      }
    });
  }

}
