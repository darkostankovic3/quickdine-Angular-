import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SubCategoryService {
  constructor(private http: HttpClient) {}

  getSubcategories(postBody) {
    return this.http
      .post("customer/menu/custom/get/sub-category", postBody)
      .map((response) => {
        return <any[]>response;
      });
  }
}
