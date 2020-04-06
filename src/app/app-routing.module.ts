import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FrontpageComponent} from './home/frontpage/frontpage.component';
import {LoginComponent} from './login/login.component';
import {ShopComponent} from './shop/shop.component';
import {CheckoutComponent} from './shop/checkout/checkout.component';
import {
  GuardService as AuthGuard
} from './shared-services/auth/guard.service';

import {
  RoleGuardService as RoleGuard
} from './shared-services/auth/roleguard.service';
import {AdminMenuComponent} from './admin/admin-menu/admin-menu.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminAccountDetailsComponent} from './admin/admin-account-details/admin-account-details.component';
import {SuperAdminHomeComponent} from './superadmin/super-admin-home/super-admin-home.component';
import {SuperAdminMenuComponent} from './superadmin/super-admin-menu/super-admin-menu.component';
import {SuperAdminProductsComponent} from './superadmin/super-admin-products/super-admin-products.component';
import {SuperAdminAddProductComponent} from './superadmin/super-admin-add-product/super-admin-add-product.component';
import {SuperAdminOrdersComponent} from './superadmin/super-admin-orders/super-admin-orders.component';
import {OrderCompleteComponent} from './shop/order-complete/order-complete.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: FrontpageComponent},
  {path: 'shop/thankyou', component: OrderCompleteComponent},
  {path: 'shop/:postalcode', component: ShopComponent},
  {path: 'shop/checkout/:postalcode', component: CheckoutComponent},
  {path: 'login', component: LoginComponent},

  {path: 'superadmin', pathMatch: 'full', redirectTo: 'superadmin/home'},
  {path: 'superadmin', component: SuperAdminMenuComponent, canActivate: [RoleGuard], data: {expectedRole: 'superadmin'} , children: [
      {
        path: 'home',
        component: SuperAdminHomeComponent,
      },
      {
        path: 'products',
        component: SuperAdminProductsComponent,
      },
      {
        path: 'products/addProduct',
        component: SuperAdminAddProductComponent,
      },
      {
        path: 'orders',
        component: SuperAdminOrdersComponent,
      }
    ]},
  {path: 'admin', pathMatch: 'full', redirectTo: 'admin/orders'},
  {path: 'admin', component: AdminMenuComponent, canActivate: [AuthGuard], children: [
      {
        path: 'orders',
        component: AdminOrdersComponent,
      },
      {
        path: 'details',
        component: AdminAccountDetailsComponent,
      }
    ]},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
