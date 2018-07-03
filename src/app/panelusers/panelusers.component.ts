import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-panelusers',
  templateUrl: './panelusers.component.html',
  styleUrls: ['./panelusers.component.css']
})
export class PanelusersComponent implements OnInit {

  constructor(
    private nav: NavbarService,
  ) { }

  ngOnInit() {
    this.nav.show();
  }

}
