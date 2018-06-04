import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sure-dialog',
  templateUrl: './sure-dialog.component.html',
  styleUrls: ['./sure-dialog.component.css']
})
export class SureDialogComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  @Input() question: string;
  @Input() confirm: string;
  @Output() sure = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  agree(){
    this.sure.emit();
    this.modalRef.hide();
  }

}
