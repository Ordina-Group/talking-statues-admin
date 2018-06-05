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
    return this.http.get<Monument[]>(environment.baseUrl+"/api/monuments");
  }
  getOneMonument(id:String):Observable<Monument>{
    return this.http.get<Monument>(environment.baseUrl+"/api/monuments/"+id);
  }
  saveMonument(monumentForm:FormGroup,monument:Monument) {
    return this.http.put(environment.baseUrl+"/api/monuments/"+monument.id,monumentForm.value);
  }
}
