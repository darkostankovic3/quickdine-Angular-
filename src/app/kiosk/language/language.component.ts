import { MenuService } from './../../_services/customer/menu.service';
import { CartService } from 'app/_services/customer/cart.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from './../../_services/customer/setting.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from './../../_services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  public uuid: string = null;
  public locationId: number;
  public languages: any[];

  constructor(
    public languageService: LanguageService,
    public router: Router,
    public settingService: SettingService,
    public translate: TranslateService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public cartService: CartService,
    public menuService: MenuService) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
    localStorage.setItem('uuid', this.uuid);
    this.http.get('customer/languages')
      .map(
        (response: any) => {
          return <any[]>response;
        }
      )
      .subscribe(
        result => {
          this.languages = [...result];
        }
      );
  }

  ngOnInit() {

  }

  selectLanguage(language: string) {
    this.translate.use("en");
    localStorage.setItem("language", language);
    this.translate.use(language);
    this.menuService.categories = [];

    setTimeout(() => {
      if (this.cartService.backLinks.length > 0)
        this.router.navigate([this.cartService.backLinks.pop()]);
      else
        this.router.navigate(['/kiosk/uuid/' + this.uuid + '/location/' + this.locationId])
    }, 100);


  }
}
