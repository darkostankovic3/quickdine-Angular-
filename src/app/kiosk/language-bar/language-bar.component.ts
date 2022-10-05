import { LanguageService } from 'app/_services/language.service';
import { CartService } from 'app/_services/customer/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.scss']
})
export class LanguageBarComponent implements OnInit {
  public _uuid: string = null;
  @Input("uuid")
  set uuid(value: string) {
    this._uuid = value;
  }
  get uuid() {
    return this._uuid;
  }

  public _locationId: number = null;
  @Input("locationId")
  set locationId(value: number) {
    this._locationId = value;
  }
  get locationId() {
    return this._locationId;
  }


  constructor(public route: ActivatedRoute,
    public router: Router,
    public cartService: CartService,
    public languageService: LanguageService) {

  }

  ngOnInit() {
  }

  languageClicked() {
    this.cartService.backLinks.push(this.router.url);
    this.router.navigate(["/kiosk/uuid/" + this.uuid + "/location/" + this.locationId + "/languages"]);
  }
}
