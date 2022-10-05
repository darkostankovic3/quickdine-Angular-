import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SettingModel } from "app/_models/setting.model";

@Injectable({
  providedIn: "root",
})
export class SettingService {
  public settings: SettingModel[] = null;

  constructor(public http: HttpClient) {}

  load() {
    // if (this.route.snapshot.params['uuid']) {
    //   localStorage.setItem('uuid', this.route.snapshot.params['uuid']);
    // }
    // this.getSettings().subscribe(result => {
    //   this.settings = result;
    // });
  }

  getSettings() {
    return this.http.get("customer/setting").map((response: any) => {
      return <SettingModel[]>response;
    });
  }

  getCurrency() {
    if (this.settings) {
      return this.settings.find((item) => item.type === "Currency").setting;
    }
    return null;
  }

  getNumberOfDecimals() {
    if (this.settings) {
      let setting = this.settings.find(
        (item) => item.type === "Number Of Decimals"
      );

      if (setting) return "0." + setting.setting;
    }
    return null;
  }

  getCurrencySymbol() {
    if (this.settings) {
      return this.settings.find((item) => item.type === "CurrencySymbol")
        .setting;
    }
    return "";
  }

  getLogo() {
    if (this.settings) {
      const setting = this.settings.find((item) => item.type === "Logo");

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getCloseTime() {
    if (this.settings) {
      const setting = this.settings.find((item) => item.type === "Close Time");

      if (setting !== undefined) return <number>setting.setting;
    }
    return 2;
  }

  getLogo2() {
    if (this.settings) {
      const setting = this.settings.find((item) => item.type === "Logo_2");

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getCaption() {
    if (this.settings) {
      const setting = this.settings.find((item) => item.type === "Caption");
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getSecondCaption() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Second Caption"
      );
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getLabelColor() {
    if (this.settings) {
      const setting = this.settings.find((item) => item.type === "Label Color");
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#343a40";
  }

  getLabel2Color() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Label2 Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#fff";
  }

  getHeaderColor() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Header Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#ff8d60";
  }

  getBackgroundColor() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Background Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#fff";
  }

  getButtonColor() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Button Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#ff8d60";
  }

  getFooterColor() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Footer Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#343a40";
  }

  getLinkColor() {
    if (this.settings) {
      const setting = this.settings.find((item) => item.type === "Link Color");
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "red";
  }

  getAddButtonColor() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Add Button Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#974d19";
  }

  getBodyBackgroundColor() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Body Background Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#fff";
  }

  getLabelBackgroundColor() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Label Background Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "rgba(0, 0, 0, 0.4)";
  }

  getMenuBackgroundColor() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Menu Background Color"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "#fff";
  }

  getHeader() {
    if (this.settings) {
      const setting = this.settings.find((item) => item.type === "Header");
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "";
  }

  getFooter() {
    if (this.settings) {
      const setting = this.settings.find((item) => item.type === "Footer");
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "";
  }

  getShowDebitPaymentButton() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Show Debit Payment Button"
      );
      if (setting !== undefined) {
        return setting.setting;
      }
    }
    return "Hide";
  }

  //Get Hot Promo Background Image
  getHotPromoBackground() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "hot_promo_background"
      );

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  //Get Find food Background Image
  getFindFoodBackground() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "find_food_background"
      );

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  //Get List Tenant Background Image
  getListTenantBackground() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "list_tenant_background"
      );

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  //Get Hot Promo Background Image
  getHotSelllerBackground() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "hot_seller_background"
      );

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getWelcomeImage() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "welcome_image"
      );

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getSecondImage() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "second_image"
      );

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getTermAndConditions() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Terms And Conditions"
      );

      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getQueueLanguageSetting() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Queue Language"
      );
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getItemRemark() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Show Item Remarks"
      );
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getTicketRemark() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Show Ticket Remarks"
      );
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getLoginScreenPlacement() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Login Screen Placement"
      );
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getKeepNumberOfTenants() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Keep Number Of Tenants"
      );
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getRefreshTimeOfQueuePage() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Refresh Time Of Queue Page"
      );
      if (setting !== undefined) return setting.setting;
    }
    return 10;
  }

  getTableLogin() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Ask Login For Table"
      );
      if (setting !== undefined) return setting.setting;
    }
    return null;
  }

  getCustomMessage() {
    if (this.settings) {
      const setting = this.settings.find(
        (item) => item.type === "Custom Message"
      );
      if (setting !== undefined) return setting.setting;
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
