import { Component } from '@angular/core';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss']
})
export class ScanQrComponent {

  qrResultString: string = "";

  clearResult(): void {
    this.qrResultString = "";
  }

  onCodeResult(resultString: string) {
    console.log(resultString)
    this.qrResultString = resultString;
  }

}
