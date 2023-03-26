import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebCamComponent } from './components/web-cam/web-cam.component';

const routes: Routes = [
  {
    path: 'webcam',
    component: WebCamComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
