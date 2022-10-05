import { TranslateService } from '@ngx-translate/core';
import { AddPriceComponent } from './../_modals/add-price/add-price.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PrimengTableService } from './../../../_services/prime-table.service';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
  providers: [PrimengTableService]
})
export class PricesComponent implements OnInit {
  public brandLocationId: number;
  public primengColumns: Array<any> = [
    {
      field: 'name',
      header: 'Product',
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
      selected: false,
      exportable: false,
      width: 100,
      display: true
    },
  ];

  @ViewChild('myTable', { static: true }) table: Table;

  constructor(public primengTableService: PrimengTableService,
    public fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public modalService: NgbModal,
    public translate: TranslateService) {

    this.primengTableService.allColumns = this.primengColumns;
    this.brandLocationId = this.route.snapshot.params['brandLocationId'];
    this.primengTableService.url = "brand-location/" + this.brandLocationId;
  }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null]
    });
  }

  delete(row: any) {
    var result = confirm("Want to delete?");

    if (result) {
      this.http.post('location/custom/delete/brand-location-product', {
        product_id: row.id,
        brand_location_id: this.brandLocationId
      })
        .subscribe(
          result => {
            this.table.reset();
          }
        );
    }
  }

  orderLink(locationId: number) {

  }

  editClicked(row: any) {
    const modalRef = this.modalService.open(AddPriceComponent, { size: 'lg' }).componentInstance;
    modalRef.productId = row.id;
    modalRef.brandLocationId = this.brandLocationId;

    // modalRef.form = this.form;
    // modalRef.index = _index;
  }

  addProductClicked() {
    const modalRef = this.modalService.open(AddPriceComponent, { size: 'lg' }).componentInstance;
    modalRef.brandLocationId = this.brandLocationId;
    modalRef.isNew = true;
    modalRef.recordAdded.subscribe(
      result => {
        this.table.reset();
      }
    );
  }
}
