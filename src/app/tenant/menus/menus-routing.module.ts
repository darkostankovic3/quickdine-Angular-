import { MenuWizardComponent } from './menu-wizard/menu-wizard.component';
import { MenusComponent } from './menus/menus.component';
import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandMenuComponent } from './brand-menu/brand-menu.component';

const routes: Routes = [
  {
    path: 'add',
    component: MenuWizardComponent,
    data: { title: 'Add Menu' }
  },
  {
    path: 'edit/:brandMenuId',
    component: MenuBuilderComponent,
    data: { title: 'Menu Builder' }
  },
  {
    path: '',
    component: MenusComponent,
    data: { title: 'Menu Builder' }
  },
  {
    path: 'brand-menu',
    component: BrandMenuComponent,
    data: { title: 'Add Brand Menu' }
  },
  {
    path: 'brand-menu/:id',
    component: BrandMenuComponent,
    data: { title: 'Edit Brand Menu' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
