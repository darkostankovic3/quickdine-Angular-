import { TenantModel } from "./../_models/tenant.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TenantService {
  constructor(public http: HttpClient) {}

  get(id: number) {
    return this.http.get("admin/tenant/" + id).map((response: any) => {
      return <TenantModel>response;
    });
  }

  store(form: any) {
    return this.http.post("admin/tenant", form);
  }

  update(form: any, tenantId: number) {
    return this.http.post("admin/tenant/" + tenantId, form);
  }

  delete(id: any) {
    return this.http.post("admin/tenant/" + id, {
      _method: "DELETE",
    });
  }

  clearDatabase(id: any) {
    return this.http.get("admin/tenant/clear-database/" + id);
  }
}
