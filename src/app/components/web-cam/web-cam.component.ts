import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/library';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { FabricReport, FabricSupplier, TypeDefect } from 'src/app/models/models';
import { FabricReportService } from 'src/app/services/fabric-report.service';
import { FabricSupplierService } from 'src/app/services/fabric-supplier.service';
import { TypeDefectService } from 'src/app/services/type-defect.service';
import { WebCamService } from 'src/app/services/web-cam.service';

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.scss'],
  providers: [MessageService]
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
  visibleQr: boolean = false;
  visiblePictures: boolean = false;
  public imagenesUr: any[] = [];
  responsiveOptions!: any[];
  items!: MenuItem[];
  report!: FormGroup;
  qrResultString: string = "";
  batchNum!: string;
  fabricSupplier: FabricSupplier = new FabricSupplier();
  typeDefect!: TypeDefect[];
  fabricReport!: FabricReport

  constructor(
    private webCamService: WebCamService,
    private fb: FormBuilder,
    private fabricSupplierService: FabricSupplierService,
    private typeDefectService: TypeDefectService,
    private fabricReportService: FabricReportService,
    private messageService: MessageService
  ) { }



  public webcamImage: WebcamImage | undefined;


  private trigger: Subject<void> = new Subject<void>();

  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {

    this.findAllTypeDefect();



    this.report = this.initForm();

    this.items = [

      {
        tooltipOptions: {
          tooltipLabel: 'Tomar Foto'
        },
        label: 'Tomar Fotos',
        icon: 'pi pi-camera',
        command: () => {
          this.showDialog()
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Agragar referencia'
        },
        label: 'Scan QR',
        icon: 'pi pi-qrcode',
        command: () => {
          this.showDialogQr()
        }
      }
    ];
    this.getScreenWidth = window.innerWidth;
  }

  initForm(): FormGroup {
    return this.fb.group({
      typeDefect: ['', [Validators.required, Validators.minLength(5)]],
      quantityAffected: ['0', [Validators.required, Validators.minLength(5)]],
      comment: ['',],
      //surnames:['',[Validators.required,Validators.minLength(5)]],
      withoutgrouping: ['', []]
    });
  }

  onSubmit(): void {
    this.fabricReport = this.report.value
    this.fabricReport!.fabricSupplier = this.fabricSupplier
    this.fabricReport.batchNum = this.batchNum
    console.log(this.fabricReport)
    //this.fabricReportService.create(this.fabricReport).subscribe(data => { console.log(data)})
    //this.webCamService.sendPicture(this.imagenesUr).subscribe()
    this.fabricReportService.createFiLE(this.fabricReport, this.imagenesUr).subscribe( data => {
      window.location.reload()
    }) 
    this.ShowSendForm();
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
    this.webcamImage = webcamImage;
    this.ShowPictureCapture();
    this.imagenesUr.push(this.webcamImage.imageAsDataUrl)
    // this.webCamService.sendPicture(this.webcamImage.imageAsDataUrl).subscribe()
  }

  public cameraWasSwitched(deviceId: string): void {
    this.addMessage('Active device: ' + deviceId);
    this.deviceId = deviceId;

  }

  addMessage(message: any): void {
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


  showDialogQr() {
    this.visibleQr = true;
  }

  showDialogPictures() {
    this.visiblePictures = true;
  }



  deleteImg(img: any): void {
    this.imagenesUr.splice(this.imagenesUr.indexOf(img), 1);
    this.showDeletePicture()
  }



  clearResult(): void {
    this.qrResultString = "";
  }

  onCodeResult(resultString: string) {

    let array = resultString.split(".")
    if (resultString != this.qrResultString) {
      this.fabricSupplierService.getFrase(array[0]).subscribe(data => {
        this.fabricSupplier = data
        this.batchNum = array[1]
      })
      this.qrResultString = resultString;
      this.ShowScanQR();
      this.visibleQr = false;
    }
  }

  onHideDialog() {
    console.log("Cerrar")
  }


  findAllTypeDefect() {
    this.typeDefectService.getAlll().subscribe(data => {
      this.typeDefect = data
    })
  }

  exist(): boolean {

    if (this.fabricSupplier == null) {
      return true;
    } else {
      return false;
    }

  }


  showDeletePicture() {
    this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: 'Foto eliminada con exito' });
  }

  ShowPictureCapture() {
    this.messageService.add({ severity: 'success', summary: 'Captura', detail: 'Captura' });
  }

  ShowScanQR() {
    this.messageService.add({ severity: 'success', summary: 'QR', detail: 'Escaneo Exitoso' });
  }

  ShowSendForm() {
    this.messageService.add({ severity: 'success', summary: 'Enviado', detail: 'Formulario enviado' });
  }


}

