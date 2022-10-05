import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DepartmentModel } from 'app/_models/department.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  public departments: any[] = null;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  addDepartment(form: any) {
    console.log(form);
    return this.http.post('department', form);
  }

  update(form: any, id: number) {
    return this.http.post('department/' + id, form);
  }

  delete(id: number) {
    return this.http.post('department/' + id, {
      _method: "DELETE"
    })
  }

  get(id: number) {
    return this.http.get('department/' + id)
      .map(
        (response: any) => {
          return <DepartmentModel>response;
        }
      );
  }

  getAllDepartments() {
    return this.http.get('department')
  }

  getDepartmentList(location_id: number) {
    return this.http.get('get/department/list/' + location_id)
      .map(
        (response: any) => {
          return response;
        }
      );
  }

  downloadQrcode(id: number) {
    this.toastr.info('Please wait while we are generating the QR-Code.', 'Info');

    return this.http.post('custom/department/qr-code', {
      department_id: id
    }, { responseType: 'blob' })
      .map(
        (response: any) => {
          var newBlob = new Blob([<any>response], { type: "application/pdf" });
          const blobUrl = URL.createObjectURL(newBlob);
          //const url = window.URL.createObjectURL(newBlob);
          //window.open(url);

          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();

          return response;
        }
      );
  }

  firstMappedDepartmentName(location_id: number) {
    return this.http.get('first/mapped/department/' + location_id)
  }
}
