import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class AppService {

  authenticated = false;
  encryptedCredentials = '';

  constructor(private http: HttpClient) {
  }

  getEncryptedCredentials() {
    return this.encryptedCredentials;
  }

  authenticate(credentials, callback) {
    console.log('Trying to login with basic auth...');
    const encryptedCreds = credentials ? 'Basic ' + btoa(credentials.username + ':' + credentials.password) : '';
    const headers = new HttpHeaders(encryptedCreds ? {
      authorization : encryptedCreds
    } : {});

    this.http.get(environment.baseUrl + '/auth/user', {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
        this.encryptedCredentials = encryptedCreds;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

}
