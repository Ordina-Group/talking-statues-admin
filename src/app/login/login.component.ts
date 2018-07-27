import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../environments/environment.prod';

import { AuthService } from '../../services/auth.service';
import { NavbarService} from '../../services/navbar.service';
import { TranslatorService } from '../shared/services/translator.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  // title = 'UGO | Management Panel';

  constructor(
    public translate: TranslatorService,
    private app: AuthService,
    private router: Router,
    private nav: NavbarService
  ) {
    // translate.addLangs(['de', 'en', 'es', 'fr', 'nl']);
    // translate.setDefaultLang('en');

    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/de|en|es|fr|nl/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.nav.hide();
    this.translate.initTranslate();
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
