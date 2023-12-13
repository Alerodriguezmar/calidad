import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import {
  FabricReport,
  FabricSupplier,
  OIBT,
  TypeDefect,
} from 'src/app/models/models';
import { FabricReportService } from 'src/app/services/fabric-report.service';
import { FabricSupplierService } from 'src/app/services/fabric-supplier.service';
import { OibtService } from 'src/app/services/oibt.service';
import { TypeDefectService } from 'src/app/services/type-defect.service';
import { ShowPhotosComponent } from '../../components/show-photos/show-photos.component';
import { ReferenceComponent } from '../../components/reference/reference.component';
import { CameraComponent } from 'src/app/components/camera/camera.component';

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.scss'],
  providers: [MessageService],
})
export class WebCamComponent {
  type = 'Nombre';
  imagenesUr: any[] = [];
  report!: FormGroup;
  batchNum!: string;
  fabricSupplier: FabricSupplier = new FabricSupplier();
  typeDefect!: TypeDefect[];
  fabricReport!: FabricReport;
  qrData: string = '';
  oibt: OIBT = new OIBT();
  options = ['Corte', 'Perfileria', 'Ensamble'];
  selectedType: string | undefined;

  constructor(
    private fb: FormBuilder,
    private typeDefectService: TypeDefectService,
    private fabricReportService: FabricReportService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private ngZone: NgZone
  ) {}

  public ngOnInit(): void {
    this.report = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      typeDefect: ['', [Validators.required, Validators.minLength(5)]],
      quantityAffected: [
        '0',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.max(40),
          Validators.min(0.01),
        ],
      ],
      comment: [''],
      withoutgrouping: ['', []],
    });
  }

  onSubmit(): void {
    this.fabricReport = this.report.value;
    this.fabricReport!.fabricSupplier = this.fabricSupplier;
    this.fabricReport.batchNum = this.batchNum;
    this.fabricReportService
      .createFiLE(this.fabricReport, this.imagenesUr)
      .subscribe(
        (data) => {
          window.location.reload();
          this.ShowSendForm();
        },
        (error) => {
          this.ShowSendError();
        }
      );
  }

  showCamera() {
    const dialog = this.dialogService.open(CameraComponent, {
      header: 'Camara',
      width: '80%',
      height: '80%',
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.imagenesUr.push(...res);
      }
    });
  }

  showPictures() {
    const dialog = this.dialogService.open(ShowPhotosComponent, {
      header: 'Fotos',
      data: {
        imagenesUr: this.imagenesUr,
      },
      width: '80%',
      height: '80%',
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.imagenesUr = res;
      }
    });
  }

  showReference() {
    let bol = false;
    if (this.selectedType == 'Corte') {
      bol = true;
    }
    const dialog = this.dialogService.open(ReferenceComponent, {
      header: 'Agregar Referencia',
      width: '80%',
      height: '80%',
      data: {
        isCut: bol,
      },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.batchNum = res.batchNum;
        this.fabricSupplier = res.fabricSupplier;
        this.oibt = res.oibt;
        this.messageService.add({
          severity: 'success',
          summary: 'Referencia',
          detail: 'Referencia Agregada',
          key: 'tl',
        });
      }
    });
  }

  findAllTypeDefect() {
    if (this.selectedType != 'Corte') {
      this.type = 'Nombre';
    } else {
      this.type = 'Lote(BatchNum)';
    }
    this.typeDefectService.getAlll(this.selectedType!).subscribe((data) => {
      this.typeDefect = data;
    });
  }

  ShowSendForm() {
    this.messageService.add({
      severity: 'success',
      summary: 'Enviado',
      detail: 'Formulario enviado',
      key: 'tl',
    });
  }

  ShowSendError() {
    this.messageService.add({
      severity: 'error',
      summary: 'No enviado',
      detail: 'Formulario enviado',
      key: 'tl',
    });
  }
}
