import { LocationModel } from 'app/_models/location.model';
import { LocationService } from './../../../_services/tenant/location.service';
import { FormSnippet } from './../../../_snippets/form.snipppet';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { TableService } from './../../../_services/table.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookingTableModel } from './../../../_models/booking-table.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DepartmentService } from 'app/_services/department.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public _bookingTable: BookingTableModel;
  set brand(value: BookingTableModel) {
    this._bookingTable = value;
    this.populate();
  }
  get brand() {
    return this._bookingTable;
  }
  public statusItems: any[] = [
    "Booked",
    "Vacant"
  ];
  public locations: LocationModel[];
  public departmentList: any = null;

  constructor(public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public tableService: TableService,
    public locationService: LocationService,
    public translate: TranslateService,
    public departmentService: DepartmentService
  ) {

    //Get ID from url
    if (this.router.url.indexOf('edit') != -1) {
      this.recordId = this.route.snapshot.params['id'];
      this.pageLoader = true;
    }

    this.locationService.getAllRecords()
      .subscribe(
        result => {
          this.locations = result;
        }
      );

    // Get all departments
    this.departmentService.getAllDepartments().subscribe(result => {
      this.departmentList = result;
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      status: ["Vacant", [Validators.required]],
      location_id: [null, [Validators.required]],
      department_id: [null]
    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);

      this.tableService.get(this.recordId)
        .subscribe(
          result => {
            this.brand = result;
          }
        );
    }
  }

  onSubmit() {
    this.loading = true;

    this.tableService.store(this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['tenant/tables']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  onUpdate() {
    this.loading = true;

    this.tableService.update(this.form.value, this.recordId)
      .subscribe(
        result => {
          this.router.navigate(['tenant/tables']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new BookingTableModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.brand[item]);
    }

    this.form.controls['department_id'].patchValue(this.brand['department_id'])

    this.pageLoader = false;
  }
}
