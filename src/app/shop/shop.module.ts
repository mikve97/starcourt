import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopHeaderComponent } from './shop-header/shop-header.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import {ShopComponent} from './shop.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidateModule} from '../validators/validate.module';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ShopComponent, ShopHeaderComponent, ShopItemsComponent, ShopCartComponent, CheckoutComponent, OrderCompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidateModule,
    RouterModule
  ]
})
export class ShopModule { }
