import { SubCategoryService } from "../../_services/tenant/sub-category.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MenusRoutingModule } from "./menus-routing.module";
import { MenuComponent } from "./menu/menu.component";
import { SharedModule } from "app/shared/shared.module";
import { DragulaModule } from "ng2-dragula";
import { CategoryComponent } from "./category/category.component";
import { CategoryItemComponent } from "./category-item/category-item.component";
import { SubmenuComponent } from "./submenu/submenu.component";
import { AddOnsComponent } from "./add-ons/add-ons.component";
import { MenuBuilderComponent } from "./menu-builder/menu-builder.component";
import { AddOnComponent } from "./add-on/add-on.component";
import { AddOnItemComponent } from "./add-on-item/add-on-item.component";
import { AddOnTypeComponent } from "./add-on-types/add-on-type/add-on-type.component";
import { AddOnTypeItemComponent } from "./add-on-types/add-on-type-item/add-on-type-item.component";
import { MenusComponent } from "./menus/menus.component";
import { MenuWizardComponent } from "./menu-wizard/menu-wizard.component";
import { SliderModule } from "primeng/slider";
import { CheckboxModule } from "primeng/checkbox";
import { NouisliderModule } from "ng2-nouislider";
import { BrandMenuComponent } from "./brand-menu/brand-menu.component";

@NgModule({
  declarations: [
    MenuComponent,
    CategoryComponent,
    CategoryItemComponent,
    SubmenuComponent,
    AddOnsComponent,
    MenuBuilderComponent,
    AddOnComponent,
    AddOnItemComponent,
    AddOnTypeComponent,
    AddOnTypeItemComponent,
    MenusComponent,
    MenuWizardComponent,
    BrandMenuComponent,
  ],
  imports: [
    CommonModule,
    MenusRoutingModule,
    SharedModule,
    DragulaModule,
    SliderModule,
    CheckboxModule,
    NouisliderModule,
  ],
  providers: [SubCategoryService],
})
export class MenusModule {}
