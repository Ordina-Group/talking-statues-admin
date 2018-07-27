import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavbarService } from '../../services/navbar.service';
import { TranslatorService } from '../shared/services/translator.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // isLoggedIn$: Observable<boolean>;


  path = '';
  constructor(
    public nav: NavbarService,
    public translate: TranslatorService,
    private router: Router,
    private location: Location,
  ) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
  }
  ngOnInit() {
    this.nav.show();
    this.translate.initTranslate();
  }



}
