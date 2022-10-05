import { SettingService } from './../../../_services/tenant/setting.service';
import { HttpClient } from '@angular/common/http';
import { DashboardInterface } from './../../../_interfaces/dashboard.interface';
import { LocationModel } from './../../../_models/location.model';
import { BrandModel } from './../../../_models/brand.model';
import { LocationService } from './../../../_services/tenant/location.service';
import { BrandService } from './../../../_services/tenant/brand.service';
import { Table } from 'primeng/table';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { TicketService } from 'app/_services/tenant/ticket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from '../_modals/order/order.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [PrimengTableService]
})
export class TicketsComponent implements OnInit {
  public stats: DashboardInterface;

  public statusItems = [
    "Pending",
    "Accept",
    "Reject",
    "Paid",
    "Preparing",
    "Prepared",
    "Deliver"
  ];
  public primengColumns: Array<any> = [
    {
      field: 'id',
      header: 'ID',
      sortable: true,
      selected: true,
      exportable: true,
      width: 70,
      display: true
    },
    {
      field: 'location.name',
      header: 'Location',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'user_name',
      header: 'Customer',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'booking_table_name',
      header: 'Table Name',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'amount',
      header: 'Amount',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'delivery_charge',
      header: 'Delivery Charge',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'department_charge',
      header: 'Department Charge',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'payment_method',
      header: 'Payment Method',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'order_display_date',
      header: 'Order Time',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'transaction_created_at',
      header: 'Last Payment Time',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'order_preference',
      header: 'Type',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'remarks',
      header: 'Note',
      sortable: true,
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
  public brands: BrandModel[];
  public locations: LocationModel[];
  public allLocations: LocationModel[];
  public tableList: any = null;
  public isTableItemList = [
    { id: "has_table", text: "Has Table" },
    { id: "has_no_table", text: "Has No Table" }
  ]

  constructor(public primengTableService: PrimengTableService,
    public fb: FormBuilder,
    public ticketService: TicketService,
    private modalService: NgbModal,
    public translate: TranslateService,
    public brandService: BrandService,
    public locationService: LocationService,
    public http: HttpClient,
    public settingService: SettingService,
    private toastr: ToastrService) {
    this.primengTableService.url = "ticket";
    this.primengTableService.allColumns = this.primengColumns;

    this.brandService.getAllRecords()
      .subscribe(
        result => {
          this.brands = result;
        }
      );

    this.locationService.getAllRecords()
      .subscribe(
        result => {
          this.locations = result;
          this.allLocations = JSON.parse(JSON.stringify(result));
        }
      );

    this.getAllTables();
  }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null],
      brand: [null],
      status: [null],
      date_range: [null],
      location: [null],
      table_id: [null],
      is_table: [null],
      is_delivery_address: [null],
      has_customer: [null]

    });

    this.primengTableService.recordsFetched.subscribe(
      result => {
        this.stats = result.stats;
      }
    );
  }

  delete(row: any) {
    // this.brandService.delete(row.id)
    //   .subscribe(
    //     result => {
    //       this.table.reset();
    //     }
    //   );
  }

  openOrder(id: number) {
    const modal = this.modalService.open(OrderComponent, { size: 'lg' }).componentInstance;

    modal.orderId = id;
  }

  getStats() {
    this.http.post('ticket/custom/brand/ticket-history', this.primengTableService.form.value)
      .map(
        (response: any) => {
          return <DashboardInterface>response;
        }
      )
      .subscribe(
        result => {
          this.stats = result;
        }
      );
  }

  brandSelected() {
    if (this.primengTableService.form.value.brand !== null && this.primengTableService.form.value.brand.length > 0) {
      this.locations = [];

      for (const brandId of this.primengTableService.form.value.brand) {
        const brand = this.brands.find(item => item.id === brandId);
        const _locations = [];

        for (const locationId of brand.location_id) {
          const _location = this.allLocations.find(item => item.id == locationId);

          if (_location && _locations.findIndex(item => item.id === _location.id) === -1)
            _locations.push(_location);

          for (const __location of _locations)
            this.locations.push(__location);

        }
      }

    } else {
      this.primengTableService.form.patchValue({
        location: null
      });

      this.locations = [...this.allLocations];
    }

    this.table.reset();
  }

  placeOrder(id: number) {
    this.http.post('lalamove/get/quotation', {
      ticket_id: id
    })
      .map(
        (response: any) => {
          return <any>response;
        }
      )
      .subscribe(
        result => {
          this.toastr.success("Success", "Your Order is placed with id " + result.customerOrderId);
          this.table.reset();
        }
      );
  }

  cancelOrder(id: number) {
    this.http.post('lalamove/cancel/order', {
      ticket_id: id
    })
      .map(
        (response: any) => {
          return <any>response;
        }
      )
      .subscribe(
        result => {
          this.toastr.success("Success", "Your Order is cancelled ");
          this.table.reset();
        }
      );
  }

  getAllTables() {
    this.http.get('booking-table')
      .map(
        (response: any) => {
          return <any>response;
        }
      )
      .subscribe(
        result => {
          this.tableList = result;
        }
      )
  }
}
