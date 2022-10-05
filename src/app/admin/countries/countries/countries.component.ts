import { CountryService } from './../../../_services/admin/country.service';
import { FormBuilder } from '@angular/forms';
import { PrimengTableService } from './../../../_services/prime-table.service';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [PrimengTableService]
})
export class CountriesComponent implements OnInit {
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
      field: 'country',
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
    public countryService: CountryService) {
    this.primengTableService.url = "admin/countries";
    this.primengTableService.allColumns = this.primengColumns;
  }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null]
    });
  }

  delete(row: any) {
    this.countryService.delete(row.id)
      .subscribe(
        result => {
          this.table.reset();
        }
      );
  }

}
