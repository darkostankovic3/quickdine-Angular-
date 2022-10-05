import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public uuid: string;
  public status: string;

  constructor(public route: ActivatedRoute) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.status = this.route.snapshot.params['status'];
  }

  ngOnInit() {
  }

}
