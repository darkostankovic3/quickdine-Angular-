import { Paginate } from './../_interfaces/paginate.interface';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimengTableService {
  @Output() callInitiated = new EventEmitter<any>();
  @Output() recordsFetched = new EventEmitter<any>();
  @Output() errorsOccured = new EventEmitter<any>();
  @Output() resetTableColumns = new EventEmitter<any>();

  public columnOpen: boolean = false;
  public url: string = null;
  public loading: boolean = true;
  public totalRecords: number;
  records: any[];
  public rows: number = 10;
  public form: FormGroup;

  public _allColumns: any[];
  set allColumns(value: any[]) {
    let localStorageColumns = localStorage.getItem(this.url + '-cols');

    if (localStorageColumns) {
      localStorageColumns = JSON.parse(localStorageColumns);

      if ((<any>localStorageColumns).length === value.length) {
        this._allColumns = <any>localStorageColumns;
      } else {
        this._allColumns = value;
      }
    } else {
      this._allColumns = value;
    }
  }
  get allColumns() {
    return this._allColumns;
  }

  public _cols: any[];
  set cols(value: any[]) {
    if (localStorage.getItem(this.url + '-cols')) {
      this._cols = JSON.parse(localStorage.getItem(this.url + '-cols'));
    } else {
      this._cols = value;
    }
  }
  get cols() {
    return this.allColumns.filter(item => item.selected === true);
  }

  constructor(public http: HttpClient) { }

  datatable(form: any) {
    this.callInitiated.emit();
    this.loading = true;

    setTimeout(() => {
      let postData = null;
      if (this.form) {
        postData = { ...form, ...{ search: this.form.value } };
      } else {
        postData = form;
      };

      this.http.post(this.url + '/custom/datatable', postData)
        .map(
          (response: any) => {
            this.recordsFetched.emit(response);
            return <Paginate>response;
          }
        ).subscribe(
          result => {
            this.totalRecords = result.total;
            this.records = result.data;
            this.loading = false;
          }
        );
    }, 1000);
  }

  toggle(col) {
    col.selected = !col.selected; console.log(col);
    localStorage.setItem(this.url + '-cols', JSON.stringify(this._allColumns));
  }
}