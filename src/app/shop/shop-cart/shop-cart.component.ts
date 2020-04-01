import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopService} from '../shop.service';
import {Subscription} from 'rxjs';
import {ProductModel} from '../product.model';


@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit, OnDestroy {
  private shopSub: Subscription;
  public products: ProductModel[] = [];
  constructor(private shopService: ShopService) {}


  ngOnInit() {
    this.shopSub = this.shopService.productChanged.subscribe(value => this.products = value);
  }

  ngOnDestroy(): void {
    this.shopSub.unsubscribe();
  }

  public formatPrice(price) {
    let formattedPrice;
    price = price.toString();

    if( price.includes('.') ) {
      formattedPrice = price.replace('.', ',');
      const checkLength = price.slice(',');
      if (checkLength[1].length === 1) {
        formattedPrice = formattedPrice + '0';
      }
    } else {
      formattedPrice = price+ ',00';
    }


    return formattedPrice;
  }

  public addProduct(productId) {
    this.shopService.addProductById(productId);
  }

  public substractProduct(productId) {
    this.shopService.removeProductById(productId);
  }


}
