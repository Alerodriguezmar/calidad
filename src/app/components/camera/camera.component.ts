import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss',
})
export class CameraComponent implements OnInit, OnDestroy {
  showWebcam = true;
  allowCameraSwitch = true;
  private trigger: Subject<void> = new Subject<void>();
  imagenesUr: any[] = [];
  webcamImage: WebcamImage | undefined;
  deviceId!: string;
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  facingMode: string = 'environment';

  constructor(
    private messageService: MessageService,
    private ref: DynamicDialogRef
  ) {}
  ngOnDestroy(): void {
    this.showWebcam = false;
    this.ref.close(this.imagenesUr);
  }
  ngOnInit(): void {
    this.showNextWebcam(this.deviceId);
  }

  triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === 'NotAllowedError'
    ) {
      console.log(error);
    }
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.messageService.add({
      severity: 'success',
      summary: 'Captura',
      detail: 'Captura',
      key: 'bc',
    });
    this.imagenesUr.push(this.webcamImage.imageAsDataUrl);
  }
}
