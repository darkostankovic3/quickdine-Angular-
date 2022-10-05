import { SettingService } from 'app/_services/customer/setting.service';
import { CustomerDetailComponent } from './../../_modals/customer-detail/customer-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationModel } from 'app/_models/location.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'app/_services/customer/cart.service';
import { Component, OnInit, HostListener, OnDestroy, Input } from '@angular/core';
import { AuthService } from 'app/_services/auth.service';
import { bounceAnimation, rubberBandAnimation } from 'angular-animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    rubberBandAnimation({ direction: '<=>', duration: 1000 }),
    bounceAnimation({ direction: '<=>', duration: 1000 }),
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public uuid: string;
  public locationId: number;
  public location: LocationModel;

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    
    if(this.router.url.includes('payment/Omise') || this.cartService.selectedCardType == 'Paytm'){
      
    }else{
      event.returnValue = false;
    }

    
  }
  public _cartIcon = true;
  @Input('cartIcon')
  set cartIcon(value: boolean){
    this._cartIcon = value;
  }
  get cartIcon(){
    return this._cartIcon;
  }

  constructor(public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public modalService: NgbModal,
    public settingService: SettingService,
    public authService: AuthService) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.locationId = this.route.snapshot.params['locationId'];
  }

  ngOnInit() {
    if (this.locationId)
      this.getLocation();
  }

  getLocation() {
    if (!this.cartService.location || this.locationId != this.cartService.location.id) {
      this.http.get('customer/get/location/' + this.locationId)
        .map(
          (response: any) => {
            return <LocationModel>response;
          }
        )
        .subscribe(
          result => {
            this.cartService.location = JSON.parse(JSON.stringify(result));
            this.location = result;
          }
        );
    }

  }

  checkoutPage() {
    this.router.navigate(['/ordering/' + this.uuid + '/locations/' + this.locationId + '/checkout']);
  }

  openConfirmModal() {
    // if (this.cartService.location !== null && localStorage.getItem('user_id') === null && this.cartService.location.is_customer_required === true) {
    //   const modalRef = this.modalService.open(CustomerDetailComponent, { size: 'sm' }).componentInstance;
    //   modalRef.out.subscribe(
    //     result => {
    //       this.checkoutPage();
    //     }
    //   )
    // } else {
    //   this.checkoutPage();
    // }
    this.checkoutPage();
  }

  ngOnDestroy() {

  }

  logout() {

  }
  searchClicked() {

  }

  logoutClicked() {
    const previousUuid = localStorage.getItem('uuid')
    this.authService.logout();
    this.router.navigate(['ordering/' + previousUuid + '/welcome']);
  }
}
