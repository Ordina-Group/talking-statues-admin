import { FormGroup } from '@angular/forms';
import { environment } from './../environments/environment';
import { Monument } from './model/monument';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';

@Injectable()
export class ControllerService {

  constructor(private http: HttpClient, private appService: AppService) { }

  generateHeaders() {
    const encryptedCreds = this.appService.getEncryptedCredentials();
    const headers = new HttpHeaders(encryptedCreds ? {
      authorization : encryptedCreds
    } : {});
    return headers;
  }

  generateHeadersImageCall() {
    const encryptedCreds = this.appService.getEncryptedCredentials();
    const headers = new HttpHeaders(encryptedCreds ? {
      authorization : encryptedCreds,
      Accept : 'image/jpeg'
    } : {});
    return headers;
  }

  getAllMonuments(): Observable<Monument[]> {
    return this.http.get<Monument[]>(environment.baseUrl + '/monuments', {headers: this.generateHeaders()});
  }
  getOneMonument(id: string): Observable<Monument> {
    return this.http.get<Monument>(environment.baseUrl + '/monuments/' + id, {headers: this.generateHeaders()});
  }
  getOneMonumentImage(id: string): Observable<String> {
    return this.http.get<string>(environment.baseUrl + '/monuments/' + id + '/image', {headers: this.generateHeadersImageCall()});
  }

  saveMonument(monumentForm: FormGroup, monument: Monument) {
    return this.http.put(environment.baseUrl + '/monuments/' + monument.id, monumentForm.value, {headers: this.generateHeaders()});
  }

  addMonument(monumentForm: FormGroup) {
    return this.http.post(environment.baseUrl + '/monuments', monumentForm.value, {headers: this.generateHeaders()});
  }

  uploadImage(file: File, monument: Monument) {
    return this.http.post(environment.baseUrl + '/images/' + monument.id, file, {headers: this.generateHeaders()});
  }

  removeMonument(monument: Monument) {
    return this.http.delete(environment.baseUrl + '/monuments/' + monument.id, {headers: this.generateHeaders()});
  }
}
