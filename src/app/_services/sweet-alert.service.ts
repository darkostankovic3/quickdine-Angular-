import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  basicAlert(message: string) {
    Swal.fire("Here's a message!");
  }

  progress(text: string, 
          type: string, 
          title: string = null,
          confirmButtonText: string = 'OK', 
          _fn: any = () => {}) {
    if (!title) {
      if (type === 'success') {
        title = 'Good Job!';
      } else if (type === 'error') {
        title = 'Error!';
      } else if (type === 'warning') {
        title = 'Warning!';
      }
    }

    Swal.fire({
      type: <any>type,
      title: title,
      text: text,
      confirmButtonText: confirmButtonText
    }).then((result) => {
      if(result.value){
        _fn();
      }
    });
  }
}
