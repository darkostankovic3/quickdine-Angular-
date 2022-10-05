import { CategoriesComponent } from "./categories/categories.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./category/category.component";

const routes: Routes = [
  {
    path: "",
    component: CategoriesComponent,
    data: {
      title: "Category"
    }
  },
  {
    path: "add",
    component: CategoryComponent,
    data: {
      title: "Add Category"
    }
  },
  {
    path: "edit/:id",
    component: CategoryComponent,
    data: {
      title: "Edit Category"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
