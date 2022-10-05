import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public languages: any[] = [
    { language: 'Bahasa Indonesia', symbol: 'id', flag: './assets/img/flags/in.png', direction: "ltr" },
    { language: 'Bahasa Melayu', symbol: 'ms', flag: './assets/img/flags/ms.png', direction: "ltr" },
    { language: 'English', symbol: 'en', flag: './assets/img/flags/en.png', direction: "ltr" },
    { language: 'German', symbol: 'de', flag: './assets/img/flags/de.png', direction: "ltr" },
    { language: 'Norsk Bokmål', symbol: 'bg', flag: './assets/img/flags/bg.png', direction: "ltr" },
    { language: 'Arabic', symbol: 'ar', flag: './assets/img/flags/ar.png', direction: "rtl" },
    { language: 'हिंदी', symbol: 'hi-IN', flag: './assets/img/flags/hi-IN.png', direction: "ltr" },
    { language: 'தமிழ்', symbol: 'ta-IN', flag: './assets/img/flags/hi-IN.png', direction: "ltr" },
    { language: 'ภาษาไทย', symbol: 'th', flag: './assets/img/flags/th.png', direction: "ltr" },
    { language: '简体中文', symbol: 'zh-CN', flag: './assets/img/flags/zh-CN.png', direction: "ltr" },
    { language: 'Spanish', symbol: 'es', flag: './assets/img/flags/es.png', direction: "ltr" },
    { language: 'Portuguese', symbol: 'pt', flag: './assets/img/flags/pt.png', direction: "ltr" },
  ];

  constructor() { }

  getDirection() {
    if (localStorage.getItem('language')) {
      return this.languages.find(item => item.symbol === localStorage.getItem('language')).direction;
    }

    return 'ltr';
  }

  getLanguage() {
    if (localStorage.getItem('language')) {
      return this.languages.find(item => item.symbol === localStorage.getItem('language')).language;
    }

    return 'English';
  }
}
