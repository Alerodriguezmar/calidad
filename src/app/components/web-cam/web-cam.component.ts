import { Component } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { WebCamService } from 'src/app/services/web-cam.service';

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.scss']
})
export class WebCamComponent {
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId!: string;
  public facingMode: string = 'environment';
  public messages: any[] = [];
  public getScreenWidth: any;
  visible: boolean = false;
  public imagenesUr: any[] = [];
  responsiveOptions!: any[];
  items!: MenuItem[];


  constructor(private webCamService: WebCamService) { }



  public webcamImage: WebcamImage | undefined;


  private trigger: Subject<void> = new Subject<void>();

  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {

    this.items = [
      
      {
          icon: 'pi pi-camera',
          command: () => {
            this.showDialog()
             // this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      // {
      //     icon: 'pi pi-upload',
      //     routerLink: ['/fileupload']
      // },
      // {
      //     icon: 'pi pi-external-link',
      //     url: 'http://angular.io'
      // }
  ];


    this.getScreenWidth = window.innerWidth;
    console.log(this.getScreenWidth)

  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.messages.push(error);
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      this.addMessage('User denied camera access');
    }
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.addMessage('Received webcam image');
    console.log(webcamImage);
    this.webcamImage = webcamImage;

    this.imagenesUr.push(this.webcamImage.imageAsDataUrl)
    this.webCamService.sendPicture(this.webcamImage.imageAsDataUrl).subscribe(response => console.log(response),
      error => console.log('oops', error))
  }

  public cameraWasSwitched(deviceId: string): void {
    this.addMessage('Active device: ' + deviceId);
    this.deviceId = deviceId;

  }

  addMessage(message: any): void {
    console.log(message);
    this.messages.unshift(message);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }


  showDialog() {
    this.visible = true;
  }

  deleteImg(img: any): void {
    this.imagenesUr.splice(this.imagenesUr.indexOf(img), 1);
  }
}



