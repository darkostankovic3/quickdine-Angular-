import { DeleteConfirmComponent } from "app/shared/delete-confirm/delete-confirm.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TenantService } from "./../../../_services/tenant.service";
import { FormBuilder } from "@angular/forms";
import { PrimengTableService } from "./../../../_services/prime-table.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Table } from "primeng/table";

@Component({
  selector: "app-tenants",
  templateUrl: "./tenants.component.html",
  styleUrls: ["./tenants.component.scss"],
  providers: [PrimengTableService],
})
export class TenantsComponent implements OnInit {
  public primengColumns: Array<any> = [
    {
      field: "id",
      header: "ID",
      sortable: true,
      selected: true,
      exportable: true,
      width: 50,
      display: true,
    },
    {
      field: "name",
      header: "Name",
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true,
    },
    {
      field: "uuid",
      header: "UUID",
      sortable: true,
      selected: true,
      exportable: true,
      width: 150,
      display: true,
    },
    {
      field: "hostname",
      header: "Hostname",
      sortable: false,
      selected: true,
      exportable: true,
      width: 150,
      display: true,
    },
    {
      field: "country_name",
      header: "Country",
      sortable: false,
      selected: true,
      exportable: true,
      width: 150,
      display: true,
    },
    {
      field: "action",
      header: "Action",
      sortable: false,
      selected: true,
      exportable: true,
      width: 100,
      display: true,
    },
  ];

  @ViewChild("myTable", { static: true }) table: Table;

  constructor(
    public primengTableService: PrimengTableService,
    public fb: FormBuilder,
    public tenantService: TenantService,
    public modalService: NgbModal
  ) {
    this.primengTableService.url = "admin/tenant";
    this.primengTableService.allColumns = this.primengColumns;
  }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null],
    });
  }

  delete(row: any) {
    const modal = this.modalService.open(DeleteConfirmComponent, { size: "lg" })
      .componentInstance;
    modal.action.subscribe((result) => {
      if (result === true) {
        this.tenantService.delete(row.id).subscribe((result) => {
          this.table.reset();
        });
      }
    });
  }

  clearDatabase(row: any) {
    const modal = this.modalService.open(DeleteConfirmComponent, { size: "lg" })
      .componentInstance;
    modal.caption = "Are you sure you want to clear database?";
    modal.action.subscribe((result) => {
      if (result === true) {
        this.tenantService.clearDatabase(row.id).subscribe((result) => {
          this.table.reset();
        });
      }
    });
  }
}
