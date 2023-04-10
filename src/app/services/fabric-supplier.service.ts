import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FabricSupplier } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricSupplierService {

  url = 'http://localhost:8080/fabricSupplier/';

  constructor(private http: HttpClient) { }


  public getFrase(id:string): Observable<FabricSupplier> {
    return this.http.get<FabricSupplier>(`${this.url}${id}`);
  }

}