import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-monumentview',
  templateUrl: './monumentview.component.html',
  styleUrls: ['./monumentview.component.css']
})
export class MonumentviewComponent implements OnInit {

  constructor(
    private nav: NavbarService,
  ) { }

  ngOnInit() {
    this.nav.show();
  }

}
