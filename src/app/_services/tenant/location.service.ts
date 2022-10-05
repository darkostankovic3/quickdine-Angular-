import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationModel } from 'app/_models/location.model';
import { ToastrService } from 'ngx-toastr';
import { DeliveryPartnerModel } from 'app/_models/delivery-partners.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public http: HttpClient,
    private toastr: ToastrService) { }

  getAllRecords() {
    return this.http.get('location')
      .map(
        (response: any) => {
          return <LocationModel[]>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('location', form);
  }

  update(form: any, id: number) {
    return this.http.post('location/' + id, form);
  }

  get(id: number) {
    return this.http.get('location/' + id)
      .map(
        (response: any) => {
          return <LocationModel>response;
        }
      );
  }

  delete(id: number) {
    return this.http.post('location/' + id, {
      _method: "DELETE"
    });
  }

  downloadQrcode(locationId: number) {
    this.toastr.info('Please wait while we are generating the QR-Code.', 'Info');

    return this.http.post('location/custom/generate/qr-code', {
      location_id: locationId
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

  getDeliveryPartners() {
    return this.http.get('location/custom/get/delivery-partners')
      .map(
        (response: any) => {
          return <DeliveryPartnerModel[]>response;
        }
      );
  }

  getLocationDeliveryPartner(id: number) {
    return this.http.get('get/delivery-partner/location/' + id)
  }
}
