import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {UsersService} from '../../services/users.service';
import {LoginComponent} from '../login/login.component';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  // isLoggedIn$: Observable<boolean>;


  path = '';
  constructor(
    private nav: NavbarService,
    private router: Router,
    private location: Location,
  ) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
  }
  ngOnInit() {
    this.nav.show();
  }



}
