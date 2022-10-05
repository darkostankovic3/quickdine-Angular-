import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Customer_Full_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../customer/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];
