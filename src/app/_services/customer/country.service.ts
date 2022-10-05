import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    public http: HttpClient
  ) { }

  getCountriesList() {
    return this.http.get('get/countries');
  }
}
