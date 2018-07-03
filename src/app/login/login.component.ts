import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarService} from '../../services/navbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  title = 'Management Panel - Talking Statues';


  constructor(private app: AppService, private http: HttpClient, private router: Router, private nav: NavbarService) {
  }

  ngOnInit() {
    this.nav.hide();
  }

  login() {
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/monumentpanel');
      return true;
    });
    return false;
  }

  getFacebookLogin() {
    return environment.baseUrl + '/oauth2/authorization/facebook';
  }

  getGoogleLogin() {
    return environment.baseUrl + '/oauth2/authorization/google';
  }

}
