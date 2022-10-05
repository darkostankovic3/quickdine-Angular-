import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SubCategoryService {
  subCategories: any[];

  constructor(public http: HttpClient) {
    this.getSubcategories();
  }

  getSubcategories() {
    this.http
      .post("menu/custom/get/sub-category", {})
      .map((response) => {
        return <any[]>response;
      })
      .subscribe((result) => {
        this.subCategories = [...result];
      });
  }
}
