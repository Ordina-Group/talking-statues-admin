import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment.prod';

@Injectable()
export class AuthService {
  authenticated = false;
  encryptedCredentials = '';

  constructor(private http: HttpClient) {

  }

  getEncryptedCredentials() {
    return this.encryptedCredentials;
  }

  clearEncryptedCredentials() {
    this.encryptedCredentials = '';
    this.authenticated = false;
  }

  authenticate(credentials, callback) {
    console.log('Trying to login with basic auth...');
    const encryptedCreds = credentials ? 'Basic ' + btoa(credentials.username.trim() + ':' + credentials.password.trim()) : '';
    const headers = new HttpHeaders(encryptedCreds ? {
      authorization : encryptedCreds
    } : {});

    this.http.get(environment.backendUrl + '/auth/user', {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
        this.encryptedCredentials = encryptedCreds;
      } else {
        this.clearEncryptedCredentials();
      }
      return callback && callback();
    });

  }
}
