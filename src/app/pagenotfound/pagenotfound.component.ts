import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../services/navbar.service';
import { TranslatorService } from '../shared/services/translator.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(
    private nav: NavbarService,
    private _translate: TranslatorService
  ) { }

  ngOnInit() {
    this.nav.hide();
    this._translate.initTranslate();
  }

}
