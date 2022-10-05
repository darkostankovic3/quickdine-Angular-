import { CartService } from 'app/_services/customer/cart.service';
import { BrandMenuModel } from 'app/_models/brand-menu.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public brandSelected: BrandMenuModel;
  public menuSelected: any;
  public categories: BrandMenuModel[] = [];
  public categorySelected: number = null;
  public brandMenuItemList: any = null;

  constructor(public http: HttpClient,
    public cartService: CartService) { }

  setUuid(uuid: string) {
    localStorage.setItem('uuid', uuid);
  }

  getMenu(uuid: string, locationId: number, categoryId: number = null) {
    this.setUuid(uuid);
    return this.http.post('customer/menu/' + uuid + '/location/' + locationId, {
      table_id: this.cartService.tableId,
      otp: this.cartService.otp,
      category_id: categoryId
    })
      .map(
        (response: any) => {
          return <BrandMenuModel[]>response;
        }
      );
  }

  getBrandMenu(uuid: string, brandMenuId: any, locationId: string) {
    this.setUuid(uuid);
    return this.http.post('customer/menu/' + uuid + '/brand-menu/' + brandMenuId + '/location/' + locationId, {
      table_id: this.cartService.tableId,
      otp: this.cartService.otp
    })
      .map(
        (response: any) => {
          return <BrandMenuModel>response;
        }
      );
  }

  getMenuForId(uuid: string, brandMenuId: number = null, menuId: number, locationId: number) {
    this.setUuid(uuid);
    return this.http.post('customer/menu/' + uuid + '/menu/location/' + locationId, {
      brand_menu_id: brandMenuId,
      menu_id: menuId,
      table_id: this.cartService.tableId,
      otp: this.cartService.otp
    })
      .map(
        (response: any) => {
          for (const menu of response.brand_menu_items) {

            for (const _menu of menu.menu.menus)
              _menu.name = _menu.product.name;
          }
          return <BrandMenuModel>response;
        }
      );
  }

  getMenuForBrandId(locationId, form) {
    this.setUuid(form.uuid);
    return this.http.post('customer/menu/' + form.uuid + '/menu/location/' + locationId + '/products', form)
      .map(
        (response: any) => {
          for (const menu of response.brand_menu_items) {

            for (const _menu of menu.menu.menus)
              _menu.name = _menu.product.name;
          }
          return <BrandMenuModel>response;
        }
      );
  }

  getMenuWithoutBrandId(uuid: string, locationId: number, form: any = {}) {
    this.setUuid(uuid);
    return this.http.post('customer/menu/' + uuid + '/all/location/' + locationId, form)
      .map(
        (response: any) => {
          return <any>response;
        }
      );
  }

  getMenuWithoutBrandIdV2(uuid: string, locationId: number, form: any = {}) {
    this.setUuid(uuid);
    return this.http.post('customer/menu/' + uuid + '/all/location/' + locationId + '/v2', form)
      .map(
        (response: any) => {
          return <any>response;
        }
      );
  }

  getMenuCategoryWithoutBrandId(uuid: string, locationId: number, form: any = {}) {
    this.setUuid(uuid);
    return this.http.post('customer/menu/' + uuid + '/all/category/location/' + locationId, form)
      .map(
        (response: any) => {
          return <any>response;
        }
      );
  }

  getMenuByProductId(uuid: string, brandMenuId: number = null, menuId: number, locationId: number, productId: number) {
    this.setUuid(uuid);
    return this.http.post('customer/menu/' + uuid + '/menu/location/' + locationId + '/product/' + productId, {
      brand_menu_id: brandMenuId,
      menu_id: menuId,
      table_id: this.cartService.tableId,
      otp: this.cartService.otp
    })
      .map(
        (response: any) => {
          return <BrandMenuModel>response;
        }
      );
  }
}
