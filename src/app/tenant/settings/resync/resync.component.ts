import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resync',
  templateUrl: './resync.component.html',
  styleUrls: ['./resync.component.scss']
})
export class ResyncComponent implements OnInit {
  public loading: boolean = false;
  constructor(public http: HttpClient,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  resyncClicked() {
    this.loading = true;

    this.http.get('sync-credentials/custom/resync')
      .subscribe(
        result => {
          this.toastr.success("Initiated request to resync data from POS", "Success");
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }
}
