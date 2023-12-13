import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebCamComponent } from './pages/web-cam/web-cam.component';

const routes: Routes = [
  {
    path: '',
    component: WebCamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
