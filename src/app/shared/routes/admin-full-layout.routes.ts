import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Admin_Full_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../admin/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'tenants',
    loadChildren: () => import('../../admin/tenants/tenants.module').then(m => m.TenantsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../admin/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'admins',
    loadChildren: () => import('../../admin/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'countries',
    loadChildren: () => import('../../admin/countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: "my-profile",
    loadChildren: () =>
      import('../../my-profile/my-profile.module').then(m => m.MyProfileModule)
  }
];
