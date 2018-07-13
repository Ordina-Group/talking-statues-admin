import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
  }

}
