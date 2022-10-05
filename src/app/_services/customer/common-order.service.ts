import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonOrderService {
  public orderPreference: string = null;

  constructor() { }
}
