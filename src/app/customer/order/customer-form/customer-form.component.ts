import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  public form: FormGroup;
  public tableId: number;
  public uuid: string;

  constructor(public fb: FormBuilder,
    public http: HttpClient,
    public router: Router,
    public route: ActivatedRoute) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.tableId = this.route.snapshot.params['tableId'];
  }

  ngOnInit() {
    this.form = this.fb.group({
      phone_number: [null, [Validators.required]],
      booking_table_id: [this.tableId]
    });
  }

  onSubmit() {
    this.http.post('booking-table/custom/get/otp', this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['order/' + this.uuid + '/table/' + this.tableId + 'enter-otp'])
        }
      );
  }
}
