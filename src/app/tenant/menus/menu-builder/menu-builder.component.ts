import { ProductService } from "./../../../_services/tenant/product.service";
import { ProductModel } from "./../../../_models/product.model";
import { MenuComponent } from "./../menu/menu.component";
import { Subscription } from "rxjs";
import { AddOnModel } from "./../../../_models/add-on.model";
import { DragulaService } from "ng2-dragula";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-menu-builder",
  templateUrl: "./menu-builder.component.html",
  styleUrls: ["./menu-builder.component.scss"],
})
export class MenuBuilderComponent implements OnInit {
  public brandMenuId: number;
  @ViewChild("appMenu", { static: true }) appMenu: MenuComponent;
  public products: ProductModel[] = null;
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private dragulaService: DragulaService,
    public productService: ProductService,
    public translate: TranslateService
  ) {
    this.brandMenuId = this.route.snapshot.params["brandMenuId"];

    this.productService
      .productsForBrandMenu(this.brandMenuId)
      .subscribe((result) => {
        this.products = result;
        this.addDragula();
      });
  }

  addDragula() {
    this.dragulaService.destroy("DRAGULA_FACTS");
    this.dragulaService.destroy("MENUS");
    this.dragulaService.destroy("SUBMENUS");
    this.dragulaService.destroy("ADD-ONS");
    this.dragulaService.destroy("ADD-ONS-ITEMS");
    this.dragulaService.destroy("PERSON");

    this.dragulaService.createGroup("DRAGULA_FACTS", {
      copy: (el, source) => {
        return source.id === "ADD-ONS";
      },
      copyItem: (addOn: AddOnModel) => {
        return { ...addOn };
      },
      accepts: (el, target, source, sibling) => {
        if (target.id === "ADD-MAIN-MENU" && source.id === "ADD-ONS") {
          return true;
        }

        return target.id === source.id;
      },
    });
  }
  ngOnInit() {}

  addOnDeleted(addOn: AddOnModel) {
    for (const menu of this.appMenu.menus) {
      if (menu.add_ons && menu.add_ons.length > 0) {
        const index = menu.add_ons.findIndex((item) => item.id === addOn.id);
        if (index > -1)
          menu.add_ons.splice(
            menu.add_ons.findIndex((item) => item.id === addOn.id),
            1
          );
      }
    }
  }

  menuLoaded() {
    this.loading = false;
  }
}
