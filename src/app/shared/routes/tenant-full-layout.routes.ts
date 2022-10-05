import { Routes, RouterModule } from "@angular/router";

//Route for content layout with sidebar, navbar and footer
export const Tenant_Full_ROUTES: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../tenant/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },
  {
    path: "locations",
    loadChildren: () =>
      import("../../tenant/locations/locations.module").then(
        m => m.LocationsModule
      )
  },
  {
    path: "brands",
    loadChildren: () =>
      import("../../tenant/brands/brands.module").then(m => m.BrandsModule)
  },
  {
    path: "settings",
    loadChildren: () =>
      import("../../tenant/settings/settings.module").then(
        m => m.SettingsModule
      )
  },
  {
    path: "taxes",
    loadChildren: () =>
      import("../../tenant/taxes/taxes.module").then(m => m.TaxesModule)
  },
  {
    path: "menu",
    loadChildren: () =>
      import("../../tenant/menus/menus.module").then(m => m.MenusModule)
  },
  {
    path: "users",
    loadChildren: () =>
      import("../../tenant/users/users.module").then(m => m.UsersModule)
  },
  {
    path: "tickets",
    loadChildren: () =>
      import("../../tenant/tickets/tickets.module").then(m => m.TicketsModule)
  },
  {
    path: "tables",
    loadChildren: () =>
      import("../../tenant/tables/tables.module").then(m => m.TablesModule)
  },
  {
    path: "payment-methods",
    loadChildren: () =>
      import("../../tenant/payment-methods/payment-methods.module").then(
        m => m.PaymentMethodsModule
      )
  },
  {
    path: "delivery-partners",
    loadChildren: () =>
      import("../../tenant/delivery-partners/delivery-partners.module").then(
        m => m.DeliveryPartnersModule
      )
  },
  {
    path: "products",
    loadChildren: () =>
      import("../../tenant/products/products.module").then(
        m => m.ProductsModule
      )
  },
  {
    path: "category",
    loadChildren: () =>
      import("../../tenant/category/category.module").then(
        m => m.CategoryModule
      )
  },
  {
    path: "tags",
    loadChildren: () =>
      import("../../tenant/tags/tags.module").then(m => m.TagsModule)
  },
  {
    path: "twilio",
    loadChildren: () =>
      import("../../tenant/twilio/twilio.module").then(m => m.TwilioModule)
  },
  {
    path: "",
    loadChildren: () =>
      import("../../tenant/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },
  {
    path: "my-profile",
    loadChildren: () =>
      import('../../my-profile/my-profile.module').then(m => m.MyProfileModule)
  },
  {
    path: "department",
    loadChildren: () =>
      import("../../tenant/department/department.module").then(
        m => m.DepartmentModule
      )
  },
  {
    path: "cloudinary",
    loadChildren: () =>
      import("../../tenant/cloudinary/cloudinary.module").then(m => m.CloudinaryModule)
  },
];
