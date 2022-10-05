import { EventEmitter, Input } from '@angular/core';
import { SettingService } from 'app/_services/customer/setting.service';
import { Component, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animate-button',
  templateUrl: './animate-button.component.html',
  styleUrls: ['./animate-button.component.scss'],
  animations: [
    trigger('buttonTextStateTrigger', [
      state('shown', style({
        opacity: 1
      })),
      state('transitioning', style({
        opacity: 0.3
      })),
      transition('shown => transitioning', animate('600ms ease-out')),
      transition('transitioning => shown', animate('600ms ease-in'))
    ])
  ]
})
export class AnimateButtonComponent implements OnInit {
  @Output() addClicked = new EventEmitter<any>();

  private _record: any = null;
  @Input('record')
  set record(value: any) {
    this._record = value;
  }

  get record() {
    return this._record;
  }

  private _addOns: any = null;
  @Input('addOns')
  set addOns(value: any) {
    this._addOns = value;
  }

  get addOns() {
    return this._addOns;
  }

  // The current state of the button text
  buttonTextState = 'shown';
  // The text currently being show
  buttonText = "fa-plus";
  // The text that will be shown when the transition is finished
  transitionButtonText = "";

  constructor(public settingService: SettingService) { }

  ngOnInit() {
  }

  onAddToCart() {
    if (this.record.product.product_portions.length === 1) {
      // Kick off the first transition
      // this.buttonTextState = 'transitioning';
      // this.transitionButtonText = 'ADDING...';

      // // Do whatever logic here. If it is asynchronous, put the remaining code in your subscribe/then callbacks
      // // Note if your logic is snappy, you could leave the timeouts in to simulate the animation for a better UX

      // setTimeout(() => {
      //   this.buttonTextState = 'transitioning';
      //   this.transitionButtonText = 'ADDED';
      // }, 1800);

      // // Reset button text
      // setTimeout(() => {
      //   this.buttonTextState = 'transitioning';
      //   this.transitionButtonText = '';
      // }, 3600);
    }

    this.addClicked.emit(this.record);
  }

  /**
   * Respond to the transition event of the button text
   * by setting the text awaiting transition then setting the state as shown
   */
  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = 'shown';
  }
}
