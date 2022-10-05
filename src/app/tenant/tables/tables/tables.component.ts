import { OrderComponent } from './../../tickets/_modals/order/order.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TableService } from './../../../_services/table.service';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TicketModel } from 'app/_models/ticket.model';
import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  public primengColumns: Array<any> = [
    {
      field: 'id',
      header: 'ID',
      sortable: true,
      selected: true,
      exportable: true,
      width: 50,
      display: true
    },
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'location_name',
      header: 'Location',
      sortable: false,
      selected: true,
      exportable: true,
      width: 80,
      display: true
    },
    {
      field: 'status',
      header: 'Status',
      sortable: false,
      selected: true,
      exportable: true,
      width: 60,
      display: true
    },
    {
      field: 'otp',
      header: 'OTP',
      sortable: false,
      selected: true,
      exportable: true,
      width: 50,
      display: true
    },
    {
      field: 'department_name',
      header: 'Department',
      sortable: false,
      selected: true,
      exportable: true,
      width: 80,
      display: true
    },
    {
      field: 'user_id',
      header: 'Customer',
      sortable: false,
      selected: true,
      exportable: true,
      width: 80,
      display: true
    },
    {
      field: 'action',
      header: 'Action',
      sortable: false,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    }
  ];

  @ViewChild('myTable', { static: true }) table: Table;

  constructor(public primengTableService: PrimengTableService,
    public fb: FormBuilder,
    public tableService: TableService,
    private toastr: ToastrService,
    public router: Router,
    public translate: TranslateService,
    public http: HttpClient,
    public modalService: NgbModal) {
    this.primengTableService.url = "booking-table";
    this.primengTableService.allColumns = this.primengColumns;
  }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null]
    });
  }

  delete(row: any) {
    const modal = this.modalService.open(DeleteConfirmComponent, { size: 'lg' }).componentInstance;
    modal.action.subscribe(
      result => {
        if (result === true) {
          this.tableService.delete(row.id)
            .subscribe(
              result => {
                this.table.reset();
              }
            );
        }
      }
    );
  }

  downloadQrCode(row: any) {
    this.tableService.downloadQrcode(row.id)
      .subscribe();
  }

  scan(row: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/order/' + localStorage.getItem('uuid') + '/table/' + row.id + '/enter/otp/location/' + row.location_id])
    );
    window.open(window.location.origin + url)
    // this.router.navigate(['/order/' + localStorage.getItem('uuid') + '/table/' + row.id + '/enter/otp/location/' + row.location_id]);
    //this.router.navigate(['/order/' + localStorage.getItem('uuid') + '/location/' + row.location_id])
  }

  scanNew(row: any) {

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/ordering/' + localStorage.getItem('uuid') + '/table/' + row.id + '/otp/location/' + row.location_id])
    );
    window.open(window.location.origin + url)

    // this.router.navigate(['/ordering/' + localStorage.getItem('uuid') + '/table/' + row.id + '/otp/location/' + row.location_id]);
    //this.router.navigate(['/order/' + localStorage.getItem('uuid') + '/location/' + row.location_id])
  }

  generateOtp(row: any) {

    this.tableService.generateOtp(row.name, row.location_id)
      .subscribe(
        result => {
          row.otp = result;
        }
      );
  }

  clearTable(row: any) {
    this.tableService.clearTable(row.name, row.location_id, 'Vacant')
      .subscribe(
        result => {
          this.table.reset();
        }
      );

  }

  updateStatus(name: string, locationId: number, status: string) {
    return this.http.post('booking-table/custom/update/status', {
      status: status,
      // booking_table_id: id
      booking_table_name: name,
      location_id: locationId
    })
      .subscribe(
        result => {
          this.table.reset();
        }
      );
  }

  openTicket(ticket: TicketModel) {
    const modal = this.modalService.open(OrderComponent, { size: 'lg' }).componentInstance;

    modal.orderId = ticket.id;
  }
}
