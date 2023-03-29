import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    WebCamComponent,
    ScanQrComponent
    
  ],
  imports: [
    BrowserModule,
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
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
