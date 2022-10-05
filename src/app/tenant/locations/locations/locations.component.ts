import { DeleteConfirmComponent } from './../../../shared/delete-confirm/delete-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from './../../../_services/tenant/location.service';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  providers: [PrimengTableService]
})
export class LocationsComponent implements OnInit {

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
      field: 'is_active',
      header: 'Status',
      sortable: false,
      selected: true,
      exportable: true,
      width: 100,
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
    public locationService: LocationService,
    private toastr: ToastrService,
    public router: Router,
    public translate: TranslateService,
    public modalService: NgbModal) {
    this.primengTableService.url = "location";
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
          this.locationService.delete(row.id)
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
    this.locationService.downloadQrcode(row.id)
      .subscribe();
  }

  orderLink(locationId: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/order/' + localStorage.getItem('uuid') + '/location/' + locationId])
    );
    window.open(window.location.origin + url)
    // this.router.navigate(['/order/' + localStorage.getItem('uuid') + '/location/' + locationId])
  }

  orderingLink(locationId: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/ordering/' + localStorage.getItem('uuid') + '/welcome/location/' + locationId])
    );
    window.open(window.location.origin + url)
    // this.router.navigate(['/ordering/' + localStorage.getItem('uuid') + '/welcome'])
  }

  kioskLink(locationId: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/kiosk/uuid/' + localStorage.getItem('uuid') + '/location/' + locationId])
    );
    window.open(window.location.origin + url)
    // this.router.navigate(['/kiosk/uuid/' + localStorage.getItem('uuid') + '/location/' + locationId])
  }

  queueLink(locationId: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/kiosk/uuid/' + localStorage.getItem('uuid') + '/location/' + locationId + '/queue'])
    );
    window.open(window.location.origin + url)
  }

  ticketHistoryClicked(rowData, brand) {
    this.router.navigate(['/tenant/tickets/location/' + rowData.id + '/brand/' + brand.brand.id]);
  }
}
