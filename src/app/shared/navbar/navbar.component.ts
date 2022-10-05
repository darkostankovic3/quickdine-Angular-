import { LanguageService } from './../../_services/language.service';
import { AuthService } from './../../_services/auth.service';
import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();
  public languages;
  @Output() directionChange = new EventEmitter<any>();

  public config: any = {};

  constructor(public translate: TranslateService, private layoutService: LayoutService,
    private configService: ConfigService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public languageService: LanguageService) {
    this.languages = this.languageService.languages;
    //const browserLang: string = translate.getBrowserLang();
    const browserLang = localStorage.getItem('language');
    this.currentLang = browserLang;

    if (!browserLang) {
      translate.use('en');
    } else {
      translate.use(browserLang);
    }
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
  }

  ngAfterViewInit() {
    let dir = 'ltr';
    if (localStorage.getItem('language')) {
      dir = (<any>this.languages.find(item => item.symbol == localStorage.getItem('language'))).direction;

      if (dir === "rtl") {
        this.placement = "bottom-left";
      } else if (dir === "ltr") {
        this.placement = "bottom-right";
      }
    }

    // if (this.config.layout.dir) {
    //   const dir = this.config.layout.dir;
    //   if (dir === "rtl") {
    //     this.placement = "bottom-left";
    //   } else if (dir === "ltr") {
    //     this.placement = "bottom-right";
    //   }
    // }
  }


  ChangeLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translate.use(language);
    location.reload();
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  logoutClicked() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  myProfile() {
    const base_path = this.route.snapshot.routeConfig['path'];
    this.router.navigate([base_path + '/my-profile']);
  }
}
