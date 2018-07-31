import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
//  title = 'app';
  constructor(private app: AuthService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }
  logout() {
    console.log('Logout was called...');
    this.http.post(environment.backendUrl + '/logout', {}).subscribe();
    this.app.clearEncryptedCredentials();
    this.router.navigateByUrl('/login');
  }

}
