import { BrandService } from './../../../_services/tenant/brand.service';
import { BrandModel } from './../../../_models/brand.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { ProductService } from 'app/_services/tenant/product.service';
import { ExcelService } from 'app/_services/excel.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [PrimengTableService]
})
export class ProductsComponent implements OnInit {
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
      field: 'default_name',
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
      field: 'is_enable',
      header: 'Active/Inactive',
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
  @ViewChild('uploadInput', { static: true }) uploadInput: ElementRef;
  @ViewChild('myTable', { static: true }) table: Table;
  public types: any = [
    "Products",
    "Combos"
  ];

  constructor(public primengTableService: PrimengTableService,
    public http: HttpClient,
    public fb: FormBuilder,
    public productService: ProductService,
    public excelService: ExcelService,
    private toastr: ToastrService,
    public router: Router,
    public brandService: BrandService,
    public translate: TranslateService,
    public modalService: NgbModal) {
    this.primengTableService.url = 'product';
    this.primengTableService.allColumns = this.primengColumns;
    this.brandService.getAllRecords()
      .subscribe(
        result => {
          this.brands = [...result];
        }
      );
  }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null],
      brand_id: [null],
      type: [null],
      show_inactive: [null]
    });
  }

  delete(row: any) {
    const modal = this.modalService.open(DeleteConfirmComponent, { size: 'lg' }).componentInstance;
    modal.action.subscribe(
      result => {
        if (result === true) {
          this.productService.delete(row.id)
            .subscribe(
              result => {
                this.table.reset();
              }
            );
        }
      }
    );
  }

  edit(row: any) {
    if (row.is_combo === true) {
      this.router.navigate(['tenant/products/combo/edit/' + row.id]);
    } else {
      this.router.navigate(['tenant/products/edit/' + row.id]);
    }
  }

  getAllProductForExport() {
    return this.productService.getAllRecords()
      .subscribe(
        result => {
          this.exportToExcel(result);
        }
      );
  }

  exportToExcel(result) {
    const records = JSON.parse(JSON.stringify(result)); // Deep clone

    // Re-format from Raw data
    const resData = [];
    for (let i = 0; i < records.length; i++) {
      const item = records[i];
      const brandName = (item.brand && item.brand.name) || '';
      const newItem = [
        item.name,
        brandName,
        '', // PortionName Column
        '', // PortionTag Column
        '', // PortionPrice Column
      ];
      resData.push(newItem);

      if (item.product_portions && item.product_portions.length > 0) {
        const productPortions = item.product_portions;
        for (let j = 0; j < productPortions.length; j++) {
          const productPortionItem = [
            '', // Product Name Column
            '', // Brand Name Column
            productPortions[j].name,
            productPortions[j].display_tag,
            productPortions[j].display_price,
          ];
          resData.push(productPortionItem);
        }
      }

    }

    // Export with config
    const today = new Date();
    const currentTime = today.toISOString().substr(0, 10) + `-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    const config = {
      fileName: `Products-${currentTime}.xlsx`,
      sheetName: 'Products',
      titles: ['Name', 'Brand', 'PortionName', 'PortionTag', 'PortionPrice'],
      data: resData,
    }

    this.excelService.export(config);

  }

  triggerSelectFile(evt) {
    evt.preventDefault();
    this.uploadInput.nativeElement.click();
  }

  importExcel(evt) {
    if (evt.target.files.length === 0) {
      console.log('Not select file');
      this.toastr.error('Not select file', 'Error');
      return false;
    }

    const callbackHandle = this.importProducts.bind(this);

    return this.excelService.importExcel(evt.target.files, callbackHandle);
  }

  importProducts(arrayData) {
    // Clear file user selected
    this.uploadInput.nativeElement.value = '';

    // Validate data
    if (!this.validateExcelData(arrayData)) {
      return false;
    }

    // Begin submit data
    return this.productService.importProducts(arrayData)
      .subscribe(
        result => {
          this.table.reset();
          this.toastr.success('Import Success', 'Success');
        },
        error => {
          this.toastr.error('Import Error', 'Error');
        }
      );
  }

  validateExcelData(arrayData) {
    if (!(arrayData instanceof Array)) {
      this.toastr.error('Data is not compatible', 'Error');
      return false;
    }

    if (arrayData.length === 0) {
      this.toastr.error('File data is empty', 'Error');
      return false;
    }

    for (let i = 0; i < arrayData.length; i++) {
      if (
        !arrayData[i].Brand && !arrayData[i].Name &&
        !arrayData[i].PortionName && !arrayData[i].PortionTag && arrayData[i].PortionPrice
      ) {
        this.toastr.error('Data is missing', 'Error');
        return false;
      }
    }

    return true;
  }

  updateProductStatus(status) {
    this.http.post('product/custom/status/update', {
      search: {
        ...this.primengTableService.form.value, ...{ is_enable: status }
      }
    })
      .subscribe(
        result => {
          this.toastr.success('Product status updated successfully', 'Success');
        }
      );
  }

}
