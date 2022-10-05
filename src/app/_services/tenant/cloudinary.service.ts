import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CloudinaryModel } from 'app/_models/cloudinary.model';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(
    public http: HttpClient
  ) { }

  store(form: any) {
    return this.http.post('cloudinary', form)
  }

  get() {
    return this.http.get('get/cloudinary')
      .map(
        (response: any) => {
          return <CloudinaryModel>response;
        }
      );
  }
}
