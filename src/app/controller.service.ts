import { FormGroup } from '@angular/forms';
import { environment } from './../environments/environment';
import { Monument } from './model/monument';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';

@Injectable()
export class ControllerService {

  constructor(private http:HttpClient, private appService:AppService) { }

  generateHeaders() {
    const encryptedCreds = this.appService.getEncryptedCredentials();
    const headers = new HttpHeaders(encryptedCreds ? {
      authorization : encryptedCreds
    } : {});
    return headers;
  }

  checkAuthentication():Observable<String>{
    return this.http.get<String>(environment.baseUrl+"/auth/user-info");
  }

  getAllMonuments():Observable<Monument[]>{
    return this.http.get<Monument[]>(environment.baseUrl+"/monuments", {headers: this.generateHeaders()});
  }
  getOneMonument(id:String):Observable<Monument>{
    return this.http.get<Monument>(environment.baseUrl+"/monuments/"+id, {headers: this.generateHeaders()});
  }
  saveMonument(monumentForm:FormGroup,monument:Monument) {
    return this.http.put(environment.baseUrl+"/monuments/"+monument.id,monumentForm.value, {headers: this.generateHeaders()});
  }
  addMonument(monumentForm:FormGroup){
    return this.http.post(environment.baseUrl+"/monuments",monumentForm.value, {headers: this.generateHeaders()});
  }
  uploadImage(file: File,monument:Monument) {
    return this.http.post(environment.baseUrl+"/images/"+monument.id,file, {headers: this.generateHeaders()});
  }
  removeMonument(monument:Monument){
    return this.http.delete(environment.baseUrl+"/monuments/"+monument.id, {headers: this.generateHeaders()});
  }
}
