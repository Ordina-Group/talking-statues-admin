import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Monument} from '../models/AppUser';
import {environment} from '../environments/environment.prod';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';


@Injectable()
export class MonumentsService {

  data: Monument[];
  sharingData: Monument;
  constructor(private _http: HttpClient) { }

  // http requests are asynchronous --> use observable return type
  getMonuments(): Observable<Monument[]> {
    const dbUrl = environment.backendUrl + '/monuments';
    return this._http.get<Monument[]>(dbUrl, {withCredentials: true}).pipe(
      map( res => this.data =  res),
      tap( res => console.log(res))
    );
  }

  getAreas(): Observable<any> {
    return this._http.get(environment.backendUrl + '/monuments/areas', {withCredentials: true});
  }

  getMonumentById(id: string): Observable<Monument> {
    return this._http.get<Monument>(environment.backendUrl + '/monuments/' + id, {withCredentials: true});
  }

  removeMonument(monument: Monument) {
    return this._http.delete(environment.backendUrl + '/monuments/' + monument.id, {withCredentials: true});
  }

  editMonument(monument: Monument): Observable<Monument> {
    return this._http.put<Monument>(environment.backendUrl + '/monuments/' +  monument.id, monument, {withCredentials: true});
  }

  uploadImage(file: File, monument: Monument) {
    return this._http.post(environment.backendUrl + '/images/' + monument.id, file, {withCredentials: true});
  }

  saveData(str) {
    this.sharingData = str;
  }
  getData() {
  return this.sharingData;
}

}
