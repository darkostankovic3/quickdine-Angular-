import { SettingService } from './../../../_services/customer/setting.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent implements OnInit {
  public tags: [] = [];

  constructor(public modal: NgbActiveModal,
    public settingService: SettingService) { }

  ngOnInit() {
  }
}
