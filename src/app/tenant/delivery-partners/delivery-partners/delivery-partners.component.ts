import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimengTableService } from 'app/_services/prime-table.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-delivery-partners',
  templateUrl: './delivery-partners.component.html',
  styleUrls: ['./delivery-partners.component.scss'],
  providers: [PrimengTableService]
})
export class DeliveryPartnersComponent implements OnInit {
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
      header: 'Delivery Partners',
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
    public fb: FormBuilder,)
   { 
    this.primengTableService.url = "delivery-partners";
    this.primengTableService.allColumns = this.primengColumns;
   }

  ngOnInit() {
    this.primengTableService.form = this.fb.group({
      search: [null]
    });
  }

}
