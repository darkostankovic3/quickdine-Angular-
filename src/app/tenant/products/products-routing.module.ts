import { ProductsComponent } from "./../products/products/products.component";
import { ProductComponent } from "./product/product.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComboComponent } from "./product-combo/product-combo.component";

const routes: Routes = [
  {
    path: "add",
    component: ProductComponent,
    data: { title: "Add Product" }
  },
  {
    path: "edit/:id",
    component: ProductComponent,
    data: { title: "Edit Product" }
  },
  {
    path: "",
    component: ProductsComponent,
    data: { title: "All Products" }
  },
  {
    path: "combo/add",
    component: ProductComboComponent,
    data: { title: "Add Combo Product" }
  },
  {
    path: "combo/edit/:id",
    component: ProductComboComponent,
    data: { title: "Add Combo Product" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
