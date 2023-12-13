import { Component, Input, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-show-photos',
  templateUrl: './show-photos.component.html',
  styleUrl: './show-photos.component.scss',
})
export class ShowPhotosComponent implements OnDestroy {
  imagenesUr: any[] = [];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor(
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    if (this.config.data && this.config.data.imagenesUr) {
      this.imagenesUr = this.config.data.imagenesUr;
    }
  }
  ngOnDestroy(): void {
    this.ref.close(this.imagenesUr);
  }

  deleteImg(img: any): void {
    this.imagenesUr.splice(this.imagenesUr.indexOf(img), 1);
    this.messageService.add({
      severity: 'success',
      summary: 'Eliminada',
      detail: 'Foto eliminada con exito',
      key: 'tl',
    });
  }
}
