import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SlideMenuModule } from 'primeng/slidemenu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WebCamComponent } from './components/web-cam/web-cam.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { SpeedDialModule } from 'primeng/speeddial';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ScanQrComponent } from './components/scan-qr/scan-qr/scan-qr.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { NgxSpinnerModule } from "ngx-spinner";
import { interceptor } from './interceptor/interceptor';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';

registerLocaleData(en);



interface NgxSpinnerConfig {
  type?: string;
}

@NgModule({
  declarations: [
    AppComponent,
    WebCamComponent,
    ScanQrComponent
    
  ],
  imports: [
    BrowserModule,
    NzStepsModule,
    NzGridModule,
    NzMessageModule,
    NzButtonModule,
    NgxScannerQrcodeModule,
    ToastModule,
    NgxSpinnerModule,
    MenuModule,
    NzDescriptionsModule,
    SplitButtonModule,
    DropdownModule,
    NzLayoutModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    CardModule,
    ZXingScannerModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    SpeedDialModule,
    HttpClientModule,
    WebcamModule,
    ButtonModule,
    MenubarModule,
    ImageModule,
    SlideMenuModule,
    GalleriaModule,
    DialogModule,
    CarouselModule,
    ContextMenuModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: interceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
