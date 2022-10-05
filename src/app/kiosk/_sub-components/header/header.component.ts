import { CartService } from 'app/_services/customer/cart.service';
import { SettingService } from 'app/_services/customer/setting.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public _url: string;
  @Input("url")
  set url(value: string) {
    this._url = value;
  }
  get url() {
    return this._url;
  }

  public _labelName: string;
  @Input("labelName")
  set labelName(value: string) {
    this._labelName = value;
  }
  get labelName() {
    return this._labelName;
  }

  public uuid: string = null;
  // @Input("uuid")
  // set uuid(value: string) {
  //   this._uuid = value;
  // }
  // get uuid() {
  //   return this._uuid;
  // }

  public locationId: number = null;
  // @Input("locationId")
  // set locationId(value: number) {
  //   this._locationId = value;
  // }
  // get locationId() {
  //   return this._locationId;
  // }


  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  constructor(public router: Router,
    public settingService: SettingService,
    public cartService: CartService,
    public route: ActivatedRoute) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
  }

  ngOnInit() {
  }

  backClicked() {
    if (this.cartService.backLinks.length > 0)
      this.router.navigate([this.cartService.backLinks.pop()]);
    else
      this.router.navigate([this.url]);
  }

  ngOnDestroy() {

  }
}
