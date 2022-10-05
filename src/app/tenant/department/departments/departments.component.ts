import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { DepartmentService } from 'app/_services/department.service';
import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  providers: [PrimengTableService]
})
export class DepartmentsComponent implements OnInit {
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
      field: 'caption',
      header: 'Caption',
      sortable: false,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: 'amount_type',
      header: 'Amount or Percent',
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
      field: 'action',
      header: 'Action',
      sortable: false,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    }
  ]

  @ViewChild('myTable', { static: true }) table: Table;
  constructor(
    public primengTableService: PrimengTableService,
    public fb: FormBuilder,
    public departmentService: DepartmentService,
    public modalService: NgbModal
  ) {
    this.primengTableService.url = "department";
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
          this.departmentService.delete(row.id)
            .subscribe(
              result => {
                this.table.reset();
              }
            );
        }
      }
    );
  }

  downloadQrCode(row) {
    this.departmentService.downloadQrcode(row.id)
      .subscribe();
  }

}
