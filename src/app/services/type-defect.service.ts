import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeDefect } from '../models/models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TypeDefectService {

  
  url = 'http://192.168.1.8:8080/typeDefect';

  constructor(private http: HttpClient) { }

  public getAlll(): Observable<TypeDefect[]> {
    return this.http.get<TypeDefect[]>(`${this.url}`);
  }

}
