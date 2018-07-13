import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';

import { AuthService } from '../../services/auth.service';
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
  title = 'UGO | Management Panel';


  constructor(private app: AuthService, private http: HttpClient, private router: Router, private nav: NavbarService) {
  }

  ngOnInit() {
    this.nav.hide();
  }

  login() {
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/monuments');
      return true;
    });
    return false;
  }

  getFacebookLogin() {
    return environment.backendUrl + '/oauth2/authorization/facebook';
  }

  getGoogleLogin() {
    return environment.backendUrl + '/oauth2/authorization/google';
  }

}
