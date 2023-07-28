import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
} from 'ngx-scanner-qrcode';
import { UserService } from 'src/app/services/user-service/user.service';
@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss']
})
export class ScanQrComponent {


  operatorInfo:string = "";
  OrderInfo:string = "";
  viewLector:boolean = false;
  typeOperator:boolean = false;
  current = 0;
  horaLocal: string | undefined;


 
    @ViewChild('action') action!: NgxScannerQrcodeComponent;
  
    constructor(private qrcode: NgxScannerQrcodeService,private userService:UserService,private message: NzMessageService,private router: Router) { }
    


    public config: ScannerQRCodeConfig = {
      fps:500,
      constraints: {
        video: {
          width: window.innerWidth
        },
      },
    };
    

    public onEvent(e: ScannerQRCodeResult[], action?: any): void {

       

        let a = this.setInfo(e[0].value)

        a.then((resultado) =>{
          if(resultado == true){
            action['stop' ]().subscribe((r: any) => console.log('stop', r), alert);
        
            this.viewLector = false
            this.next()
          }  
        }
        )
    }
  


    public async handle(action: any, fn: string): Promise<void> {

      this.viewLector = true
      
      // Fix issue #27, #29
      const playDeviceFacingBack = (devices: any[]) => {
        // front camera or back camera check here!
        const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
        action.playDevice(device ? device.deviceId : devices[0].deviceId);
      }
    
        if (fn === 'start') {
          action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
        } else {
          action[fn]().subscribe((r: any) => console.log(fn, r), alert);
        }
  
    }
  
  
    pre(): void {
      this.current -= 1;
    }
  
    next(): void {
      this.current += 1;
    }
  

    setInfo(infoqr: string): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        let resultado: boolean;
    
        switch (this.current) {
          case 0: {
            this.operatorInfo = infoqr;
            this.userService.findEmployee(this.operatorInfo).subscribe(
              {
                next: (data) => {
                  resultado = true;
                  resolve(resultado);
                  this.message.create('success', `Ingreso Exitoso`);
                },
                error: (error) => {
                  resultado = false;
                  resolve(resultado);
                  this.message.create('error', `${error.error.messageD}`);
                
                }
              }
            );
            break;
          }
          case 1: {

            const fechaActual = new Date();
            this.horaLocal = fechaActual.toISOString();
            this.OrderInfo = infoqr;

            this.userService.operatorTraking(this.operatorInfo,this.OrderInfo,this.horaLocal).subscribe(
              {
                next: (data) => {
                  this.message.create('success', `Ingreso Exitoso`);
                  this.router.navigateByUrl('/scan-qr');
                  this.current = 0
                },
                error: (error) => {
      
                  this.message.create('error', `${error.error.messageD}`);
                }
              }
            )

            resultado = true;
            resolve(resultado);
            break;
          }
          case 2: {
            resultado = true;
            resolve(resultado);
            break;
          }
          default: {
            resultado = false;
            resolve(resultado);
            break;
          }
        }
      });
    }



}
