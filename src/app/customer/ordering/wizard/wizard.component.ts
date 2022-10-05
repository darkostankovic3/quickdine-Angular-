import { CartService } from 'app/_services/customer/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonOrderService } from './../../../_services/customer/common-order.service';
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
  public uuid: string;

  constructor(public commonOrderService: CommonOrderService,
    public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public cartService: CartService) {
    this.uuid = this.route.snapshot.params["uuid"];
  }

  ngOnInit() {
    this.form = this.fb.group({
      order_preference: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.cartService.backLinks.length > 0) {
      this.router.navigate([this.cartService.backLinks.pop()]);
    } else {
      this.router.navigate(['ordering/' + this.uuid + '/locations']);
    }
  }
}
