import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FabricReport } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://192.168.116.15:22111';

  constructor(private http: HttpClient) { }



  findEmployee(code:string): Observable<any[]> {
    return this.http.get<any>(
      `${this.url}/operator-tracking/findUser/`+ code
    );
    }

    operatorTraking(code:string,order:string,time:string): Observable<any[]> {
      return this.http.get<any>(
        `${this.url}/operator-tracking/register/`+ code +'/'+ order +'/'+ time
      );
      }

}
