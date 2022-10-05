import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/_services/customer/cart.service';

@Component({
  selector: 'app-menu-notification',
  templateUrl: './menu-notification.component.html',
  styleUrls: ['./menu-notification.component.scss']
})
export class MenuNotificationComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit() {
  }

}
