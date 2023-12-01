import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebCamService {

  url = 'http://192.168.100.247:42111/ftp/upload';

  constructor(private http: HttpClient) { }


  // sendPicture(imgUrl: string): Observable<any> {
  //   const formData = new FormData();
  //   // Agrega la imagen al FormData

  //   const blob = this.dataURLtoBlob(imgUrl)
  //   const blob2 = this.dataURLtoBlob(imgUrl)
  //   formData.append('file', blob,'image.jpg');
  //   formData.append('file', blob2,'image2.jpg');
  //   return this.http.post(this.url, formData);
  // }


  sendPicture(imgUrl: string[]): Observable<any> {
    const formData = new FormData();
    // Agrega la imagen al FormData

    const blobsArray: (string | Blob)[] = [];
    
    for (let i = 0; i < imgUrl.length; i++) {
      blobsArray[i] = this.dataURLtoBlob(imgUrl[i])
    }

    for (let i = 0; i < blobsArray.length; i++) {
      formData.append('file', blobsArray[i],`image${i}.jpg`);
    }

    return this.http.post(this.url, formData);
  }


   dataURLtoBlob(imgUrl: string) {
    var arr = imgUrl.split(','), mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

}
