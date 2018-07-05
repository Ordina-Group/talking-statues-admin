import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Monument} from '../models/AppUser';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map, tap} from 'rxjs/operators';


@Injectable()
export class MonumentsService {

  data: Monument[];
  sharingData: Monument;
  constructor(private _http: HttpClient) { }

  // http requests are asynchronous --> use observable return type
  getMonuments(): Observable<Monument[]> {
    const dbUrl = environment.baseUrl + '/monuments';
    return this._http.get<Monument[]>(dbUrl).pipe(
      map( res => this.data =  res),
      tap( res => console.log(res))
    );
  }

  getMonumentById(id: string): Observable<Monument> {
    return this._http.get<Monument>(environment.baseUrl + '/monuments/' + id);
  }

  removeMonument(monument: Monument) {
    return this._http.delete(environment.baseUrl + '/monuments/' + monument.id);
  }

  editMonument(monument: Monument) { }

  uploadImage(file: File, monument: Monument) {
    return this._http.post(environment.baseUrl + '/images/' + monument.id, file);
  }

  saveData(str) {
    this.sharingData = str;
  }
  getData() {
  return this.sharingData;
}

}
