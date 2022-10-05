import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ProductModel } from "app/_models/product.model";
import { AddOnModel } from "./../../../_models/add-on.model";
import { MenuModel } from "./../../../_models/menu.model";
import { MenuService } from "./../../../_services/menu.service";
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public loading: boolean;
  @Output() menuLoaded = new EventEmitter<boolean>();

  subs = new Subscription();
  public menus: MenuModel[];
  public addCategoryClicked: boolean = false;
  private _brandMenuId: number;
  @Input("brandMenuId")
  set brandMenuId(value: number) {
    this._brandMenuId = value;
    this.getMenu();
  }

  get brandMenuId() {
    return this._brandMenuId;
  }

  public _products: ProductModel[];
  @Input("products")
  set products(value: ProductModel[]) {
    this._products = [...value];
    console.log(this._products);
  }

  get products() {
    return this._products;
  }

  constructor(
    public menuService: MenuService,
    public http: HttpClient,
    public fb: FormBuilder,
    private dragulaService: DragulaService,
    public translate: TranslateService
  ) {
    //MENUS
    {
      this.dragulaService.createGroup("MENUS", {
        direction: "horizontal",
        moves: (el, source, handle) => {
          return handle.className.indexOf("main-menu-handle") >= 0;
        },
      });

      this.subs.add(
        this.dragulaService.drop("MENUS").subscribe(({ name, el, source }) => {
          this.menuService
            .reorder(this.brandMenuId, this.menus)
            .subscribe((result) => {});
        })
      );
    }

    //SUBMENUS
    {
      this.subs.add(
        this.dragulaService
          .drop("SUBMENUS")
          .subscribe(({ name, el, source }) => {
            this.menuService
              .reorder(this.brandMenuId, this.menus)
              .subscribe((result) => {});
          })
      );

      this.dragulaService.createGroup("SUBMENUS", {
        direction: "horizontal",
        moves: (el, source, handle) => {
          return handle.className.indexOf("submenu-menu-handle") >= 0;
        },
      });
    }

    //MENU-ADD-ONS
    {
      this.subs.add(
        this.dragulaService
          .drop("ADD-ONS")
          .subscribe(({ name, el, target, source }) => {
            setTimeout(() => {
              const menuId = <number>(
                (<any>target.id.replace("ADD-MAIN-MENU-", ""))
              );
              const addOnId = <number>(<any>el.id);
              const menu = this.menus.find((item) => item.id == menuId);

              //Make sure that same item does not exist
              if (
                menu.add_ons.filter((item) => item.id == addOnId).length === 1
              ) {
                this.menuService
                  .linkAddOn({
                    menu: menu,
                    brand_menu_id: this.brandMenuId,
                  })
                  .subscribe((result) => {});
              } else {
                menu.add_ons.splice(
                  menu.add_ons.findIndex((item) => item.id == addOnId),
                  1
                );
              }
            }, 1000);
          })
      );

      this.dragulaService.createGroup("ADD-ONS", {
        copy: (el, source) => {
          return source.id === "ADD-ONS";
        },
        copyItem: (addOn: AddOnModel) => {
          return new AddOnModel(addOn.id, addOn.name);
        },
        moves: (el, source, handle) => {
          return true;
        },
        accepts: (el, target, source, sibling) => {
          if (target.id.includes("ADD-MAIN-MENU") && source.id === "ADD-ONS") {
            return true;
          }

          return target.id === source.id;
        },
      });
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      _method: ["PUT"],
    });
  }

  getMenu() {
    this.menuService
      .getMenuItemsForBrandMenu(this.brandMenuId)
      .subscribe((result) => {
        this.menus = [...result];
        this.menuLoaded.emit();
      });

    this.menuService.get(this.brandMenuId).subscribe((result) => {
      this.form.patchValue({
        name: [result.name],
      });
    });
  }

  addToMenu(menu: MenuModel) {
    this.menus.push(menu);
    this.addCategoryClicked = !this.addCategoryClicked;
  }

  deleteMenu(menu: MenuModel) {
    if (menu.parent_id !== null) {
      const _menu = this.menus.find((item) => item.parent_id === menu.id);
      const subMenuIndex = _menu.menus.findIndex((item) => item.id === menu.id);
      _menu.menus.splice(subMenuIndex, 1);
    } else {
      const index = this.menus.findIndex((item) => item.id === menu.id);
      this.menus.splice(index, 1);
    }
  }

  deleteSubMenu(subMenu: MenuModel, menu: MenuModel) {
    const index = menu.menus.findIndex((item) => item.id === menu.id);
    menu.menus.splice(index, 1);
  }

  addToSubmenu(menu: MenuModel, parentMenu: MenuModel) {
    if (!parentMenu.menus) {
      parentMenu.menus = new Array();
    }

    parentMenu.menus.push(menu);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  deleteBrandMenuItemAddOn(addOn: AddOnModel, menu: MenuModel) {
    menu.add_ons.splice(
      menu.add_ons.findIndex((item) => item.id === addOn.id),
      1
    );
    this.menuService
      .linkAddOn({
        menu: menu,
        brand_menu_id: this.brandMenuId,
      })
      .subscribe((result) => {});
  }

  onUpdate() {
    this.loading = true;

    this.http
      .post("brand-menu/custom/update/" + this.brandMenuId, this.form.value)
      .subscribe(
        (result) => {
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
