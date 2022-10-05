import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { TagModel } from "app/_models/tag.model";

@Injectable({
  providedIn: "root"
})
export class TagService {
  constructor(public http: HttpClient, private toastr: ToastrService) {}

  getAllRecords() {
    return this.http.get("tag").map((response: any) => {
      return <TagModel[]>response;
    });
  }

  store(form: any) {
    return this.http.post("tag", form);
  }

  update(form: any, id: number) {
    return this.http.post("tag/" + id, form);
  }

  get(id: number) {
    return this.http.get("tag/" + id).map((response: any) => {
      return <TagModel>response;
    });
  }

  delete(id: number) {
    return this.http.post("tag/" + id, {
      _method: "DELETE"
    });
  }
}
