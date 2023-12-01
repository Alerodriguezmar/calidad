import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OIBT } from '../models/models';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OibtService {

  url = 'http://192.168.100.247:42111/OIBT';

  constructor(private http: HttpClient) { }



  public getItemCode(batchNum:string): Observable<string[]> {
      const params = new HttpParams().set('batchNum', batchNum);
      return this.http.get<string[]>(`${this.url}/itemCode`,{ params }).pipe(delay(1000));
  }

  public getOibt(batchNum:string): Observable<OIBT[]> {
    const params = new HttpParams().set('batchNum', batchNum);
    return this.http.get<OIBT[]>(`${this.url}`,{ params }).pipe(delay(1000));
}

}
