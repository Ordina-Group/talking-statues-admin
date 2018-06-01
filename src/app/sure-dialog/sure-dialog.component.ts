import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sure-dialog',
  templateUrl: './sure-dialog.component.html',
  styleUrls: ['./sure-dialog.component.css']
})
export class SureDialogComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  constructor() { }

  ngOnInit() {
  }

}
