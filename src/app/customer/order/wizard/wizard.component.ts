import { CommonOrderService } from './../../../_services/customer/common-order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'app/_services/customer/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  public selectedType: any;
  public types = [
    { label: 'Dine In', value: 'Dine In' },
    { label: 'Take Away', value: 'Take Away' }
  ];
  public form: FormGroup;
  public uuid: string = null;
  public locationId: number = null;

  constructor(public cartService: CartService,
    public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public commonOrderService: CommonOrderService) {
    // this.uuid = this.route.snapshot.params["uuid"];
    // this.locationId = this.route.snapshot.params["locationId"];
  }

  ngOnInit() {
    this.form = this.fb.group({
      order_preference: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.router.navigate(["order/locations"])
  }
}
