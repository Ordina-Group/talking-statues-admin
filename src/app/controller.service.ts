import { FormGroup } from '@angular/forms';
import { environment } from './../environments/environment.prod';
import { Monument } from './model/monument';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ControllerService {

  constructor(private http:HttpClient) { }

  checkAuthentication():Observable<String>{
    return this.http.get<String>(environment.baseUrl+"/auth/user-info");
  }

  getAllMonuments():Observable<Monument[]>{
    return this.http.get<Monument[]>(environment.baseUrl+"/monuments");
  }
  getOneMonument(id:String):Observable<Monument>{
    return this.http.get<Monument>(environment.baseUrl+"/monuments/"+id);
  }
  saveMonument(monumentForm:FormGroup,monument:Monument) {
    return this.http.put(environment.baseUrl+"/monuments/"+monument.id,monumentForm.value);
  }
  addMonument(monumentForm:FormGroup){
    return this.http.post(environment.baseUrl+"/monuments",monumentForm.value);
  }
  uploadImage(file: File,monument:Monument) {
    return this.http.post(environment.baseUrl+"/images/"+monument.id,file);
  }
  removeMonument(monument:Monument){
    return this.http.delete(environment.baseUrl+"/monuments/"+monument.id);
  }
}
