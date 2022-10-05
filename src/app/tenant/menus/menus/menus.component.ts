import { BrandMenuService } from './../../../_services/tenant/brand-menu.service';
import { MenuService } from './../../../_services/menu.service';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  providers: [PrimengTableService]
})
export class MenusComponent implements OnInit {
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
      field: 'pic',
      header: 'Image',
      sortable: true,
      selected: true,
      exportable: true,
      width: 50,
      display: true
    },
    {
      field: 'logo_pic',
      header: 'Logo',
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
      field: 'brand',
      header: 'Brand',
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
    public brandMenuService: BrandMenuService,
    public translate: TranslateService,
    public modalService: NgbModal) {
    this.primengTableService.url = "brand-menu";
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
          this.brandMenuService.delete(row.id)
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
