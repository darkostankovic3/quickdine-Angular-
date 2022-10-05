import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {
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
