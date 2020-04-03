import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopHeaderComponent } from './shop-header/shop-header.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import {ShopComponent} from './shop.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EmailDirective} from '../validators/email.directive';
import {PostalcodeDirective} from '../validators/postalcode.directive';
import {AppModule} from '../app.module';
import {ValidateModule} from '../validators/validate.module';



@NgModule({
  declarations: [ShopComponent, ShopHeaderComponent, ShopItemsComponent, ShopCartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidateModule
  ]
})
export class ShopModule { }
