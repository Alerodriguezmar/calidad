import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FabricSupplier, OIBT } from 'src/app/models/models';
import { FabricSupplierService } from 'src/app/services/fabric-supplier.service';
import { OibtService } from 'src/app/services/oibt.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {
  type = 'Buscar';
  batchNum: string = '';
  oibts: OIBT[] = [];
  oibt: OIBT | undefined;
  fabricSupplier: FabricSupplier = new FabricSupplier();
  constructor(
    private oibtService: OibtService,
    private fabricSupplierService: FabricSupplierService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    if (this.config.data && this.config.data.isCut) {
      this.type = 'Lote';
    }
  }

  onInputChangeBatchNum() {
    let isCut = false;
    if (this.config.data.isCut) {
      isCut = true;
    }
    this.oibtService.getOibt(this.batchNum, isCut).subscribe((data) => {
      this.oibts = data;
      this.oibt = this.oibts[0];
    });
  }

  addReference() {
    this.fabricSupplierService
      .getFrase(this.oibt!.itemCode)
      .subscribe((data) => {
        this.fabricSupplier = data;
        this.ref.close({
          oibt: this.oibt,
          fabricSupplier: this.fabricSupplier,
          batchNum: this.batchNum,
        });
      });
  }
}
