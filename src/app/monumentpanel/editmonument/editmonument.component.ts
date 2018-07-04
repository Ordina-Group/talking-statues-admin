import { Component, OnInit } from '@angular/core';
import {MonumentsService} from '../../../services/monuments.service';

@Component({
  selector: 'app-editmonument',
  templateUrl: './editmonument.component.html',
  styleUrls: ['./editmonument.component.css']
})
export class EditmonumentComponent implements OnInit {

  editData: any;
  constructor(
    private monumentService: MonumentsService,
  ) { }

  ngOnInit() {
    this.editData = this.monumentService.getData();
    console.log('EditData = ' + this.editData);
  }


}
