import { HttpClient } from '@angular/common/http';
import { LocationModel } from 'app/_models/location.model';
import { CustomerInformationComponent } from './../_modals/customer-information/customer-information.component';
import { SettingService } from 'app/_services/customer/setting.service';
import { ConfirmComponent } from './../_modals/confirm/confirm.component';
import { CartService } from './../../../_services/customer/cart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.scss']
})
export class OrderActionComponent implements OnInit {
  public _uuid: string = null;
  @Input('uuid')
  set uuid(value: string) {
    this._uuid = value;
  }
  get uuid() {
    return this._uuid;
  }
  public _locationId: string;
  @Input('locationId')
  set locationId(value: string) {
    this._locationId = value;

    this.http.get('customer/get/location/' + this.locationId)
      .map(
        (response: any) => {
          return <LocationModel>response;
        }
      )
      .subscribe(
        result => {
          this.location = result;
        }
      );
  }
  get locationId() {
    return this._locationId;
  }
  modalOption: NgbModalOptions = {};
  @Output() back = new EventEmitter<any>();

  public _showBack = true;
  @Input('showBack')
  set showBack(value: boolean) {
    this._showBack = value;
  }

  get showBack() {
    return this._showBack;
  }
  public _backLink: string;
  @Input('backLink')
  set backLink(value: string) {
    this._backLink = value;
  }

  get backLink() {
    return this._backLink;
  }

  public location: LocationModel;

  constructor(public router: Router,
    public cartService: CartService,
    private modalService: NgbModal,
    public settingService: SettingService,
    public http: HttpClient) { }

  ngOnInit() {
  }

  loadCart() {
    this.router.navigate(['order/' + this.uuid + '/location/' + this.locationId + '/cart']);
  }

  openConfirmModal() {
    if (this.location !== null && localStorage.getItem('user_id') === null && this.location.is_customer_required === true) {
      const modalRef = this.modalService.open(CustomerInformationComponent, { ariaLabelledBy: 'modal-basic-title' }).componentInstance;
      modalRef.out.subscribe(
        result => {
          this.router.navigate(['/order/' + this.uuid + '/location/' + this.locationId + '/payment']);
        }
      )
    } else {
      this.router.navigate(['/order/' + this.uuid + '/location/' + this.locationId + '/payment']);
    }
    // this.modalOption.backdrop = 'static';
    // this.modalOption.keyboard = false;
    // this.modalOption.windowClass = "modal-md modal-xxl";

    // const modalRef = this.modalService.open(ConfirmComponent, this.modalOption).componentInstance;
    // modalRef.locationId = this.locationId;
    // modalRef.uuid = this.uuid;
  }

  backClicked() {
    this.back.emit();
  }
}
