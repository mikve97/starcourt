import { Component, OnInit } from '@angular/core';
import {ShopService} from '../shop.service';
import {ProductModel} from '../product.model';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.css']
})
export class ShopItemsComponent implements OnInit {

  constructor(private shop: ShopService) { }

  ngOnInit() {
  }

  public addToCart(id, name, price) {
    this.shop.addProduct(new ProductModel(id, name, 'Eten', price));
  }


}
