import { SharedModule } from "app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoryRoutingModule } from "./category-routing.module";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryComponent } from "./category/category.component";

@NgModule({
  declarations: [CategoriesComponent, CategoryComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule]
})
export class CategoryModule {}
