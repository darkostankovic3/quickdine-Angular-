import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AttachmentModel } from './../../../_models/attachment.model';
import { MenuService } from './../../../_services/menu.service';
import { MenuModel } from './../../../_models/menu.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ProductModel } from 'app/_models/product.model';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  public loading: boolean;
  public form: FormGroup;
  public editMode: boolean;
  public addSubmenuClicked: boolean = false;
  public isOpen: boolean = false;

  private _menu: MenuModel;
  @Input('menu')
  set menu(value: MenuModel) {
    this._menu = value;
  }

  get menu() {
    return this._menu;
  }

  private _parentMenu: MenuModel;
  @Input('parentMenu')
  set parentMenu(value: MenuModel) {
    this._parentMenu = value;
  }

  get parentMenu() {
    return this._parentMenu;
  }

  private _brandMenuId: number;
  @Input('brandMenuId')
  set brandMenuId(value: number) {
    this._brandMenuId = value;
  }

  get brandMenuId() {
    return this._brandMenuId;
  }

  @Output() recordDeleted = new EventEmitter<any>();
  @Output() recordAdded = new EventEmitter<any>();

  @ViewChild('myDrop', { static: true })
  private myDrop: NgbDropdown;

  public _products: ProductModel[];
  @Input('products')
  set products(value: ProductModel[]) {
    this._products = [...value];
  }

  get products() {
    return this._products;
  }

  constructor(public menuService: MenuService,
    public translate: TranslateService,
    private http: HttpClient,
    public fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.menu.name, [Validators.required]],
      menu_id: [this.menu.id, [Validators.required]]
    });
  }

  delete() {
    this.loading = true;

    this.menuService.delete(this.menu.id, this.brandMenuId)
      .subscribe(
        result => {
          if (this.menu.parent_id !== null) {
            this.deleteSubmenu();
          } else {
            this.recordDeleted.emit(this.menu);
          }

          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  deleteSubmenu() {
    const subMenuIndex = this.parentMenu.menus.findIndex(item => item.id === this.menu.id);
    this.parentMenu.menus.splice(subMenuIndex, 1);
  }

  updloadImage(attachment: AttachmentModel) {
    this.menu.pic = attachment.file_path;

    this.menuService.uploadImage({
      menu_id: this.menu.id,
      attachment_id: attachment.id,
      brand_menu_id: this.brandMenuId
    })
      .subscribe(
        result => {

        },
        error => {

        }
      );
  }

  subMenuAdded(menu: MenuModel) {
    this.recordAdded.emit(menu);
  }

  onSubmit(form: FormGroup) {
    this.loading = true;

    this.menuService.updateDetails(form.value)
      .subscribe(
        result => {
          this.loading = false;
          this.form.patchValue({
            name: form.value.name
          });
          this.menu.name = form.value.name;
        },
        error => {
          this.loading = false;
        }
      );
  }

  cancelSubmenu(event: any) {
    if (this.menu.parent_id !== null) {
      this.isOpen = false;
    }

    this.addSubmenuClicked = !this.addSubmenuClicked;
  }

  deleteMenuPic(menu_id: number) {
    this.http.post("attachment/custom/delete", {
      type: "Menu",
      menu_id: menu_id
    }).subscribe(result => {
      this.menu.pic = null;
    });
  }
}
