import { CartService } from 'app/_services/customer/cart.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from 'app/_services/customer/setting.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from 'app/_services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
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
    public cartService: CartService) {
    this.uuid = this.route.snapshot.params['uuid'];

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

    if (this.cartService.backLinks.length > 0) {
      this.router.navigate([this.cartService.backLinks.pop()]);
    } else {
      this.router.navigate(['ordering/' + this.uuid + '/locations']);
    }
  }
}
