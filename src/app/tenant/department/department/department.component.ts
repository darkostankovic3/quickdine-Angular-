import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { DepartmentService } from 'app/_services/department.service';
import { DepartmentModel } from 'app/_models/department.model';
import { FormSnippet } from 'app/_snippets/form.snipppet';
import { TaxService } from 'app/_services/tax.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public recordId: number = null;
  public amountType = [
    { id: 'percent', text: 'Percent' },
    { id: 'amount', text: 'Amount' },
  ];

  public _department: DepartmentModel;
  set department(value: DepartmentModel) {
    this._department = value;
    this.populate();
  }
  get department() {
    return this._department;
  }

  public taxes: any = null

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public departmentService: DepartmentService,
    public taxService: TaxService
  ) {
    //Get ID from url
    if (this.router.url.indexOf('edit') != -1) {
      this.recordId = this.route.snapshot.params['id'];
      this.pageLoader = true;
    }

    this.getTaxes();
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      amount_type: [null, [Validators.required]],
      amount: [null, [Validators.required, CustomValidators.number]],
      caption: [null, [Validators.required]],
      taxes: [null]

    });

    if (this.recordId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl('_method', method);

      this.departmentService.get(this.recordId)
        .subscribe(
          result => {
            this.department = result;
          }
        );
    }
  }

  onSubmit() {
    this.loading = true;
    this.departmentService.addDepartment(this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['tenant/department']);
        },
        error => {
          this.loading = false;
        }
      )
  }

  onUpdate() {
    this.loading = true;
    this.departmentService.update(this.form.value, this.recordId)
      .subscribe(
        result => {
          this.router.navigate(['tenant/department']);
        },
        error => {
          this.loading = false;
        }
      )
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new DepartmentModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.department[item]);
    }

    this.pageLoader = false;
  }

  getTaxes() {
    this.taxService.getAllRecords()
      .subscribe(
        result => {
          if (result) {
            this.taxes = result

          }
        }
      )
  }

}
