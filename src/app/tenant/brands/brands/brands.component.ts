import { BrandService } from './../../../_services/tenant/brand.service';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  providers: [PrimengTableService]
})
export class BrandsComponent implements OnInit {
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
    public brandService: BrandService,
    public translate: TranslateService,
    public modalService: NgbModal) {
    this.primengTableService.url = "brand";
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
          this.brandService.delete(row.id)
            .subscribe(
              result => {
                this.table.reset();
              }
            );
        }
      }
    );
  }
}
