import { BrandMenuModel } from 'app/_models/brand-menu.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuModel } from 'app/_models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public http: HttpClient) { }

  get(id: number) {
    return this.http.get('brand-menu/' + id)
      .map(
        (response: any) => {
          return <BrandMenuModel>response;
        }
      );
  }

  getAllRecords() {
    return this.http.get('menu')
      .map(
        (response: any) => {
          return <MenuModel[]>response;
        }
      );
  }

  store(form: any) {
    return this.http.post('menu', form)
      .map(
        (response: any) => {
          return <MenuModel>response;
        }
      );
  }

  update(id: number, form: any) {
    return this.http.post('menu/' + id, form)
      .map(
        (response: any) => {
          return <MenuModel>response;
        }
      );
  }

  delete(menuId: number, brandMenuId: number) {
    return this.http.post('menu/custom/' + menuId + '/delete/' + brandMenuId, { _method: "DELETE" });
  }

  getMenuItemsForBrandMenu(brandMenuId: number) {
    return this.http.post('menu/custom/get/items', {
      brand_menu_id: brandMenuId
    })
      .map(
        (response: any) => {
          return <MenuModel[]>response;
        }
      );
  }

  uploadImage(form: any) {
    return this.http.post('menu/custom/upload/image', form);
  }

  reorder(brandMenuId: number, menus: MenuModel[]) {
    return this.http.post('menu/custom/set/line-number/' + brandMenuId, menus);
  }

  linkAddOn(form: any) {
    return this.http.post('menu/custom/link/add-on', form);
  }

  updateDetails(form: any) {
    return this.http.post('menu/custom/update/details', form);
  }
}
