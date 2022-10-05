import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';
import { LoginAsComponent } from './../../../shared/login-as/login-as.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './../../../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { UserModel } from 'app/_models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [PrimengTableService]
})
export class UsersComponent implements OnInit {
  public isAdmin: boolean = false;
  public items = [
    "Tenant", "Customer"
  ];
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
      field: 'email',
      header: 'Email',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'tenant_name',
      header: 'Tenant',
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'type',
      header: 'Type',
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

  constructor(
    public primengTableService: PrimengTableService,
    public fb: FormBuilder,
    public userService: UserService,
    public router: Router,
    public http: HttpClient,
    private modalService: NgbModal
  ) {

    console.log(this.router.url);

    if (this.router.url === '/admin/admins') {
      this.primengColumns = [
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
          field: 'email',
          header: 'Email',
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
      ]
    }
    this.primengTableService.url = 'admin/users';
    this.primengTableService.allColumns = this.primengColumns;
  }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null],
      is_super_admin: [false],
      type: [null]
    });

    if (this.router.url.indexOf('admins') !== -1) {
      this.primengTableService.form.patchValue({
        is_super_admin: true
      });
      this.isAdmin = true;
    } else {
      this.primengTableService.form.patchValue({
        is_super_admin: false
      });
    }
  }

  delete(row: any) {
    const modal = this.modalService.open(DeleteConfirmComponent, { size: 'lg' }).componentInstance;
    modal.action.subscribe(
      result => {
        if (result === true) {
          this.userService.delete(row.id).subscribe(result => {
            this.table.reset();
          });
        }
      }
    );
  }

  loginAsClicked(row: any) {
    this.http
      .post('admin/users/login-as', { email: <UserModel>row.email })
      .subscribe(result => {
        const modalRef = this.modalService.open(LoginAsComponent, {
          size: 'lg'
        }).componentInstance;
        modalRef.token = (<any>result).token;
      });
  }
}
