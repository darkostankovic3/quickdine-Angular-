import { BrandService } from "./../../../_services/tenant/brand.service";
import { BrandModel } from "./../../../_models/brand.model";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Table } from "primeng/table";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PrimengTableService } from "app/_services/prime-table.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { TagService } from "app/_services/tenant/tag.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"],
  providers: [PrimengTableService]
})
export class TagsComponent implements OnInit {
  public brands: BrandModel[];
  public primengColumns: Array<any> = [
    {
      field: 'id',
      header: 'ID',
      sortable: true,
      selected: true,
      exportable: true,
      width: 60,
      display: true
    },
    {
      field: "name",
      header: "Name",
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: "brand",
      header: "Brand",
      sortable: true,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    },
    {
      field: "action",
      header: "Action",
      sortable: false,
      selected: true,
      exportable: true,
      width: 100,
      display: true
    }
  ];

  @ViewChild("myTable", { static: true }) table: Table;

  constructor(
    public primengTableService: PrimengTableService,
    public fb: FormBuilder,
    public tagService: TagService,
    private toastr: ToastrService,
    public router: Router,
    public brandService: BrandService,
    public translate: TranslateService,
    public modalService: NgbModal
  ) {
    this.primengTableService.url = "tag";
    this.primengTableService.allColumns = this.primengColumns;
    this.brandService.getAllRecords().subscribe(result => {
      this.brands = [...result];
    });
  }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null],
      brand_id: [null]
    });
  }

  delete(row: any) {
    const modal = this.modalService.open(DeleteConfirmComponent, { size: 'lg' }).componentInstance;
    modal.action.subscribe(
      result => {
        if (result === true) {
          this.tagService.delete(row.id)
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
