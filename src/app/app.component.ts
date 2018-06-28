import { Component } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
//  title = 'app';
  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }
  logout() {
    console.log('Logout was called...');
    this.http.post(environment.baseUrl + '/logout', {}).finally(() => {
      this.app.clearEncryptedCredentials();
      this.router.navigateByUrl('/login');
    }).subscribe();
  }

}
