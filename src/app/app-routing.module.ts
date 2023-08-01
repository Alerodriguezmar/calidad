import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanQrComponent } from './components/scan-qr/scan-qr/scan-qr.component';
import { WebCamComponent } from './components/web-cam/web-cam.component';

const routes: Routes = [
  {
    path: 'webcam',
    component: WebCamComponent
  },
  {
    path: '',
    component: WebCamComponent
  },
  {
    path:'scan',
    component: ScanQrComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
