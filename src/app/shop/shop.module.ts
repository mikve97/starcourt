import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopHeaderComponent } from './shop-header/shop-header.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import {ShopComponent} from './shop.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';



@NgModule({
  declarations: [ShopComponent, ShopHeaderComponent, ShopItemsComponent, ShopCartComponent],
  imports: [
    CommonModule,
  ]
})
export class ShopModule { }
