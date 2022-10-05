import { CustomerDetailComponent } from "./../_modals/customer-detail/customer-detail.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { LocationModel } from "app/_models/location.model";
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "app/_services/customer/cart.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ordering-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  public uuid: string;
  public locationId: number;
  public location: LocationModel;

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public modalService: NgbModal
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
    this.locationId = this.route.snapshot.params["locationId"];
  }

  ngOnInit() {}

  checkoutPage() {
    this.router.navigate([
      "/ordering/" + this.uuid + "/locations/" + this.locationId + "/checkout",
    ]);
  }

  openConfirmModal() {
    this.checkoutPage();

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
  }
}
