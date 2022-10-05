import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-omise-failed',
  templateUrl: './omise-failed.component.html',
  styleUrls: ['./omise-failed.component.scss']
})
export class OmiseFailedComponent implements OnInit {
  public message: any = null;
  public uuid: any = null;
  constructor(public route: ActivatedRoute,
    public router: Router) {

    this.message = this.route.snapshot.params['message'];
    this.uuid = this.route.snapshot.params['uuid'];
  }

  ngOnInit() {
  }

  homeClicked() {
    this.router.navigate(['/ordering/' + this.uuid + '/welcome'])
  }
}
