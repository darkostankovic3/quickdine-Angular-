import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription, Observable } from 'rxjs';
import { CartService } from 'app/_services/customer/cart.service';
import { SettingService } from './../../_services/customer/setting.service';
import { TicketModel } from './../../_models/ticket.model';
import { QzTrayService } from './../../_services/kiosk/qz-tray.service';
import { TicketService } from 'app/_services/customer/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import "rxjs/add/observable/interval";

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss']
})
export class OrderCompletedComponent implements OnInit, OnDestroy {
  public uuid: string = null;
  public locationId: number;
  public ticketId: number;
  public qrCode: string = null;
  public ticket: TicketModel;
  public sub: Subscription;
  public printed: boolean = null;

  constructor(public route: ActivatedRoute,
    public ticketService: TicketService,
    public qzTrayService: QzTrayService,
    public currencyPipe: CurrencyPipe,
    public settingService: SettingService,
    public cartService: CartService,
    public router: Router,
    public deviceDetectorService: DeviceDetectorService) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
    this.ticketId = this.route.snapshot.params['ticketId'];
    this.cartService.backLinks = [];

    this.ticketService.getQrCode(this.uuid, this.ticketId).subscribe(result => {
      this.qrCode = result;
    });

    this.ticketService.show(this.uuid, this.ticketId)
      .subscribe(
        result => {
          this.ticket = new TicketModel();
          Object.assign(this.ticket, result);

          if(!this.deviceDetectorService.isMobile()){
            this.print();
          }
        }
      );

      if(!this.deviceDetectorService.isMobile()){
        this.redirect();
      }
    
  }

  getData() {
    return
    // return 'Ticket ID: ' + this.ticket.id + '\n' +
    //   'Sub total: ' + this.currencyPipe.transform(this.ticket.sub_total, this.settingService.getCurrency(), this.settingService.getCurrencySymbol(), this.settingService.getNumberOfDecimals()) + '\n' +
    //   'Total: ' + this.currencyPipe.transform(this.ticket.amount, this.settingService.getCurrency(), this.settingService.getCurrencySymbol(), this.settingService.getNumberOfDecimals()) + '\n' +
    //   '\n   ' +
    //   '\n   ' +
    //   ' THIS IS JUST DEMO ' +
    //   '\n   ' +
    //   '\n   ' +
    //   '\n   ' +
    //   '\n   ' +
    //   '\n   ';

  }

  ngOnInit() {

  }

  print() {
    var qr = '' + this.ticket.id;
    var qrLength = qr.length + 3;
    var size1 = String.fromCharCode(qrLength % 256);
    var size0 = String.fromCharCode(Math.floor(qrLength / 256));
    var dots = '\x09';

    this.qzTrayService.getPrinters()
      .subscribe(
        result => {
          this.qzTrayService.printData('EPSON TM-T82-S/A', [

            '\x1B' + '\x61' + '\x31', // center align
            this.settingService.getHeader() + '\x0A',
            '\x0A',                   // line break
            '\x0A',                   // line break
            '\x1B' + '\x61' + '\x31', // center align
            '---------------------------------------------' + '\x0A',

            // <!-- BEGIN QR DATA -->
            '\x1D' + '\x28' + '\x6B' + '\x04' + '\x00' + '\x31' + '\x41' + '\x32' + '\x00',    // <Function 165> select the model (model 2 is widely supported)
            '\x1D' + '\x28' + '\x6B' + '\x03' + '\x00' + '\x31' + '\x43' + dots,               // <Function 167> set the size of the module
            '\x1D' + '\x28' + '\x6B' + '\x03' + '\x00' + '\x31' + '\x45' + '\x30',             // <Function 169> select level of error correction (48,49,50,51) printer-dependent
            '\x1D' + '\x28' + '\x6B' + size1 + size0 + '\x31' + '\x50' + '\x30' + qr,          // <Function 080> send your data (testing 123) to the image storage area in the printer
            '\x1D' + '\x28' + '\x6B' + '\x03' + '\x00' + '\x31' + '\x51' + '\x30',              // <Function 081> print the symbol data in the symbol storage area
            '\x1D' + '\x28' + '\x6B' + '\x03' + '\x00' + '\x31' + '\x52' + '\x30',              // <Function 082> Transmit the size information of the symbol data in the symbol storage area
            // <!-- END QR DATA -->

            '\x0A',                   // line break
            '\x0A',
            'ORDER NUMBER: ' + this.ticket.id + ' ' + '\x0A',
            '\x0A',
            '\x0A',
            '\x1B' + '\x61' + '\x31', // center align
            '---------------------------------------------' + '\x0A',
            //'Sub total: ' + this.currencyPipe.transform(this.ticket.sub_total, this.settingService.getCurrency(), this.settingService.getCurrencySymbol(), this.settingService.getNumberOfDecimals()) + '\x0A',
            //'Total: ' + this.currencyPipe.transform(this.ticket.amount, this.settingService.getCurrency(), this.settingService.getCurrencySymbol(), this.settingService.getNumberOfDecimals()) + '\x0A',
            this.settingService.getFooter() + '\x0A',
            '\x1B' + '\x61' + '\x30', // left align
            '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
            '\x1D' + '\x56' + '\x01'
          ])
            .subscribe(
              result => {
                this.qzTrayService.removePrinter();
                this.printed = true;
              },
              error => {
                this.printed = false;
              }
            );
        },
        error => {
          this.printed = false;
        }
      );
  }

  redirect() {
    this.sub = Observable.interval(this.settingService.getCloseTime() * 1000).subscribe(val => {
      if (this.printed != null)
        this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId]);
    });
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  newOrder() {
    this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId]);
  }
}
