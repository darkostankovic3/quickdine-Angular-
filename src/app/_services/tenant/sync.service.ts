import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SyncModel } from 'app/_models/sync.model';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(public http: HttpClient) { }

  get() {
    return this.http.get('sync-credentials/custom/index')
      .map(
        (response: any) => {
          return <SyncModel>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('sync-credentials/custom/store', form);
  }
}
