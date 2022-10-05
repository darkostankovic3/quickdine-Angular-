import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { TenantUsersService } from 'app/_services/tenant/tenant-users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [PrimengTableService]
})
export class UsersComponent implements OnInit {
  public primengColumns: Array<any> = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      selected: true,
      exportable: true,
      width: 80,
      display: true
    },
    {
      field: 'email',
      header: 'Email',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'brands',
      header: 'Brands',
      sortable: false,
      selected: true,
      exportable: true,
      width: 120,
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
    public tenantUserService: TenantUsersService,
    public router: Router,
    public http: HttpClient,
    private modalService: NgbModal,
    public translate: TranslateService, ) {
    this.primengTableService.url = "website-users";
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
          this.tenantUserService.delete(row.id)
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
