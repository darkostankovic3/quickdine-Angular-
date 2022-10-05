import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'app/_models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(public http: HttpClient,
    private toastr: ToastrService) { }

  getProductsForCategory(categoryId: number) {
    return this.http.get('product/custom/get/category/' + categoryId)
      .map(
        (response: any) => {
          return <ProductModel[]>response;
        }
      );
  }

  getProductsForBrand(id: number) {
    return this.http.get('product/custom/brand/' + id + '/get/products')
      .map(
        (response: any) => {
          return <ProductModel[]>response;
        }
      );
  }

  productsForBrandMenu(id: number) {
    return this.http.get('product/custom/brandMenu/' + id + '/get/products')
      .map(
        (response: any) => {
          return <ProductModel[]>response;
        }
      );
  }

  getAllRecords() {
    return this.http.get('product')
      .map(
        (response: any) => {
          return <ProductModel[]>response;
        }
      );
  }

  getAllRecordsForBrandLocation(brandLocationId: number) {
    return this.http.get('location/custom/brand-location/' + brandLocationId + '/get/products')
      .map(
        (response: any) => {
          return <ProductModel[]>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('product', form);
  }

  update(form: any, id: number) {
    return this.http.post('product/' + id, form);
  }

  get(id: number) {
    return this.http.get('product/' + id)
      .map(
        (response: any) => {
          return <ProductModel>response;
        }
      );
  }

  delete(id: number) {
    return this.http.post('product/' + id, {
      _method: "DELETE"
    });
  }

  importProducts(data: any) {
    return this.http.post('product/custom/import', { data });
  }

}
