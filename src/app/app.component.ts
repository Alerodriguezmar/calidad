import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'defect-record';
  items!: MenuItem[];
  
      ngOnInit() {
          this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-fw pi-power-off',
                routerLink: "/"
            },
            {
                separator: true
            },
              {
                  label: 'Reportes',
                  icon: 'pi pi-fw pi-file',
                  items: [
                      {
                          label: 'Nuevo',
                          icon: 'pi pi-fw pi-plus',
                          items: [
                              {
                                  label: 'Nuevo Reporte',
                                  icon: 'pi pi-camera',
                                   routerLink:"/webcam"
                              }
                          ]
                      }
                  ]
              }
             
             
          ];
      }
  
}
