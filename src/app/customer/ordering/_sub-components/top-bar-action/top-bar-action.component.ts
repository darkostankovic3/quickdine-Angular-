import { CartService } from 'app/_services/customer/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from 'app/_services/customer/setting.service';
import { CommonOrderService } from './../../../../_services/customer/common-order.service';
import { LanguageService } from 'app/_services/language.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DepartmentService } from 'app/_services/department.service';

@Component({
  selector: 'app-top-bar-action',
  templateUrl: './top-bar-action.component.html',
  styleUrls: ['./top-bar-action.component.scss']
})
export class TopBarActionComponent implements OnInit, OnDestroy {
  public uuid: string;
  public locationId: number;

  public _cartIcon = true;
  @Input('cartIcon')
  set cartIcon(value: boolean){
    this._cartIcon = value;
  }
  get cartIcon(){
    return this._cartIcon;
  }

  constructor(public languageService: LanguageService,
    public commonOrderService: CommonOrderService,
    public settingService: SettingService,
    public route: ActivatedRoute,
    public cartService: CartService,
    public router: Router,
    public departmentService: DepartmentService) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
    if (!this.router.url.includes('wizard') && !this.router.url.includes('languages') && !this.router.url.includes('department/list'))
      this.cartService.backLinks.push(this.router.url);
  }

  ngOnInit() {
    if (this.locationId)
      this.getDepartments();
  }

  ngOnDestroy() {

  }

  getDepartments() {
    if (this.departmentService.departments == null) {
      this.departmentService
        .getDepartmentList(this.locationId)
        .subscribe(
          result => {
            if (result) {
              this.departmentService.departments = [...result];

              //Mapped first department
              if (this.departmentService.departments.length > 0) {
                this.getFirstMappedDepartmentName()
                // this.cartService.departmentName = this.departmentService.departments[0].name
              }
            }

          },
          error => {

          }
        )
    }
  }

  getFirstMappedDepartmentName() {
    this.departmentService.firstMappedDepartmentName(this.locationId)
      .map((response: any) => {
        return <any>response;
      })
      .subscribe(
        result => {
          this.cartService.departmentName = result.department_name
        }
      )
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
}
