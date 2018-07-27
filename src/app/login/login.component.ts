import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarService} from '../../services/navbar.service';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  title = 'UGO | Management Panel';


  constructor(
    public translate: TranslateService,
    private app: AuthService,
    private router: Router,
    private nav: NavbarService
  ) {
    translate.addLangs(['de', 'en', 'es', 'fr', 'nl']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/de|en|es|fr|nl/) ? browserLang : 'en');
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
