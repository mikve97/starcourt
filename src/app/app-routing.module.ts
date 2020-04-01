import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FrontpageComponent} from './home/frontpage/frontpage.component';
import {LoginComponent} from './login/login.component';
import {ShopComponent} from './shop/shop.component';
import {CheckoutComponent} from './shop/checkout/checkout.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: FrontpageComponent},
  {path: 'shop/:postalcode', component: ShopComponent},
  {path: 'shop/checkout/:postalcode', component: CheckoutComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
