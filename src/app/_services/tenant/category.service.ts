import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoryModel } from "app/_models/category.model";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(public http: HttpClient) {}

  getAllRecords() {
    return this.http.get("category").map((response: any) => {
      return <CategoryModel[]>response;
    });
  }

  get(id: number) {
    return this.http.get("category/" + id).map((response: any) => {
      return <CategoryModel>response;
    });
  }

  store(form: any) {
    return this.http.post("category", form);
  }

  update(form: any, id: number) {
    return this.http.post("category/" + id, form);
  }

  delete(id: number) {
    return this.http.post("category/" + id, {
      _method: "DELETE"
    });
  }
}
