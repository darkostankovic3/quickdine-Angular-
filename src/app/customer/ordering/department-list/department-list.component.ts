import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'app/_services/department.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonOrderService } from 'app/_services/customer/common-order.service';
import { CartService } from 'app/_services/customer/cart.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  public form: FormGroup;
  public locationId: number;
  public departmentList: any;
  uuid: string;
  public newDepartment: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public departmentService: DepartmentService,
    public fb: FormBuilder,
    public commonOrderService: CommonOrderService,
    public cartService: CartService

  ) {
    this.locationId = this.route.snapshot.params['locationId'];
    this.uuid = this.route.snapshot.params['uuid'];

    this.departmentService
      .getDepartmentList(this.locationId)
      .subscribe(
        result => {
          this.departmentList = result;
        }
      )
  }

  ngOnInit() {
    this.form = this.fb.group({
      department_name: [null, [Validators.required]]
    });
  }

  backClicked() {
    if (this.cartService.backLinks.length > 0) {
      //pop existing URL
      if (this.cartService.backLinks[this.cartService.backLinks.length - 1] == this.router.url)
        this.router.navigate([this.cartService.backLinks.pop()]);

      this.router.navigate([this.cartService.backLinks.pop()]);
    } else {
      this.router.navigate(['ordering/' + this.uuid + '/locations/' + this.locationId]);
    }
  }

  onCancel() {
    this.backClicked();
  }

  onSubmit() {
    this.cartService.departmentName = this.newDepartment;
    this.backClicked();
  }
}
