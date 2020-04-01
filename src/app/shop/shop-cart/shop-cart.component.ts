import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopService} from '../shop.service';
import {Subscription} from 'rxjs';
import {ProductModel} from '../product.model';
import {formatCurrency} from '@angular/common';


@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit, OnDestroy {
  private shopSub: Subscription;
  public products: ProductModel[] = [];
  public isEmpty = true;
  constructor(private shopService: ShopService) {}


  ngOnInit() {
    this.shopSub = this.shopService.productChanged.subscribe(value => this.shopServiceCall(value));
  }

  ngOnDestroy(): void {
    this.shopSub.unsubscribe();
  }

  private shopServiceCall(products){
    this.products = products;
    if (products.length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  public formatPrice(price) {
    let formattedPrice;
    price = price.toString();

    if( price.includes('.') ) {
      formattedPrice = price.replace('.', ',');
      const checkLength = price.split('.');
      if (checkLength[1].length === 1) {
        formattedPrice = formattedPrice + '0';
      }else if(checkLength[1].length > 2){
        formattedPrice = formattedPrice.split(',');
        formattedPrice = formattedPrice[0]+ ','+formattedPrice[1].substr(0,2);
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

  public getTotalPrice(){
    let totalPrice =  0;
    if(this.products.length > 0){
      for(let product of this.products){
        totalPrice = totalPrice + product.getTotalPrice();
      }
    }

    return this.formatPrice(totalPrice);
  }


}
