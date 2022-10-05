import { HttpClient } from '@angular/common/http';
import { LanguageService } from "./../../../_services/language.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SettingService } from "app/_services/customer/setting.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-language",
  templateUrl: "./language.component.html",
  styleUrls: ["./language.component.scss"]
})
export class LanguageComponent implements OnInit {
  public languages: any[];

  constructor(
    public languageService: LanguageService,
    public router: Router,
    public settingService: SettingService,
    public translate: TranslateService,
    public http: HttpClient) {
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

  ngOnInit() { }

  selectLanguage(language: string) {
    localStorage.setItem("language", language);
    this.translate.use(language);
    const redirect = localStorage.getItem("redirectTo");
    localStorage.removeItem("redirectTo");
    if (redirect) this.router.navigate([redirect]);
    else this.router.navigate(["order/locations"]);
  }
}
