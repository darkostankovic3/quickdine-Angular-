import { BookingTableModel } from './../_models/booking-table.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(public http: HttpClient, private toastr: ToastrService) { }

  get(id: number) {
    return this.http.get('booking-table/' + id).map((response: any) => {
      return <BookingTableModel>response;
    });
  }

  store(form: any) {
    return this.http.post('booking-table', form);
  }

  update(form: any, id: number) {
    return this.http.post('booking-table/' + id, form);
  }

  delete(id: number) {
    return this.http.post('booking-table/' + id, {
      _method: 'DELETE'
    });
  }

  downloadQrcode(id: number) {
    this.toastr.info(
      'Please wait while we are generating the QR-Code.',
      'Info'
    );

    return this.http
      .post(
        'booking-table/custom/generate/qr-code',
        {
          booking_table_id: id
        },
        { responseType: 'blob' }
      )
      .map((response: any) => {
        var newBlob = new Blob([<any>response], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(newBlob);
        //const url = window.URL.createObjectURL(newBlob);
        //window.open(url);

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();

        return response;
      });
  }

  generateOtp(name: string, locationId: number) {
    return this.http
      .post('booking-table/custom/generate/otp', {
        // booking_table_id: id
        booking_table_name: name,
        location_id: locationId

      })
      .map((response: any) => {
        return <any>response.otp;
      });
  }

  clearTable(name: string, locationId: number, status: string) {
    return this.http.post('booking-table/custom/update/status', {
      // booking_table_id: id,
      booking_table_name: name,
      location_id: locationId,
      status: status
    });
  }
}
