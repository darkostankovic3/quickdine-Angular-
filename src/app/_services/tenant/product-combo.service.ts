import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductComboService {
  constructor(public http: HttpClient) {}

  store(form: any) {
    return this.http.post("product-combo", form);
  }
}
