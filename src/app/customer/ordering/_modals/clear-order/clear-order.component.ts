import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clear-order',
  templateUrl: './clear-order.component.html',
  styleUrls: ['./clear-order.component.scss']
})
export class ClearOrderComponent implements OnInit {

  @Output() action = new EventEmitter<any>();

  public _caption: string = 'Are you sure to delete?';
  @Input('caption')
  set caption(value: string) {
    this._caption = value;
  }
  get caption() {
    return this._caption;
  }

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  actionClicked(value: boolean) {
    this.action.emit(value);
    this.modal.close();
  }

}
