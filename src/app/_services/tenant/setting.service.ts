import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SettingModel } from "app/_models/setting.model";

@Injectable({
  providedIn: "root",
})
export class SettingService {
  public settings: SettingModel[];

  constructor(public http: HttpClient) {
    this.getSettings().subscribe((result) => {
      this.settings = result;
    });
  }

  getSettings() {
    return this.http.get("tenant/setting/get/all").map((response: any) => {
      return <SettingModel[]>response;
    });
  }

  store(form: any) {
    return this.http.post("setting", form);
  }

  get() {
    return this.http.get("setting").map((response: any) => {
      return <SettingModel[]>response;
    });
  }

  uploadLogo(form: any) {
    return this.http.post("tenant/custom/set/logo", form);
  }

  getLogo(logo: number) {
    return this.http.post("tenant/custom/get/logo", {
      logo: logo,
    });
  }

  getCurrency() {
    if (this.settings) {
      return this.settings.find((item) => item.type === "Currency").setting;
    }
    return null;
  }

  getCurrencySymbol() {
    if (this.settings) {
      return this.settings.find((item) => item.type === "CurrencySymbol")
        .setting;
    }
    return null;
  }

  getNumberOfDecimals() {
    if (this.settings) {
      return (
        "0." +
        this.settings.find((item) => item.type === "Number Of Decimals").setting
      );
    }
    return null;
  }

  getOmisePublicKey() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "OMISE_PUBLIC_KEY"
      );
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getPayAtCounter() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Pay At Counter"
      );
      if (setting !== undefined) return setting.setting;
    }
    return "Show";
  }
}
