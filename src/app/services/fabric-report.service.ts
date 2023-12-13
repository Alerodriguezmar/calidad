import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FabricReport } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FabricReportService {
  //url = 'http://localhost:22110/fabricReport';
  url = 'http://192.168.100.180:22110/fabricReport';

  constructor(private http: HttpClient) {}

  public create(fabricReport: FabricReport): Observable<FabricReport> {
    return this.http.post<FabricReport>(`${this.url}`, fabricReport);
  }

  sendPicture(imgUrl: string[]): Observable<any> {
    const formData = new FormData();
    // Agrega la imagen al FormData

    const blobsArray: Blob[] = [];

    for (let i = 0; i < imgUrl.length; i++) {
      blobsArray[i] = this.dataURLtoBlob(imgUrl[i]);
    }

    for (let i = 0; i < blobsArray.length; i++) {
      formData.append('file', blobsArray[i], `image${i}.jpg`);
    }

    return this.http.post(this.url, formData);
  }

  dataURLtoBlob(imgUrl: string) {
    var arr = imgUrl.split(','),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  public createFiLE(fabricReport: FabricReport, imgUrl: string[]) {
    const formData = new FormData();

    const json = JSON.stringify(fabricReport);
    const blob = new Blob([json], {
      type: 'application/json',
    });

    const blobsArray: Blob[] = [];

    for (let i = 0; i < imgUrl.length; i++) {
      blobsArray[i] = this.dataURLtoBlob(imgUrl[i]);
    }

    for (let i = 0; i < blobsArray.length; i++) {
      formData.append('file', blobsArray[i], `${i}.jpg`);
    }

    formData.append('report', blob);

    return this.http.post<FabricReport>(`${this.url}/addFile`, formData);
  }
}
