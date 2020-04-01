import { Component, OnInit } from '@angular/core';
import {ShopService} from '../shop.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private shopSub;
  public postalCode;
  public products = [];
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {
    this.postalCode = this.activatedRoute.snapshot.params.postalcode;
  }

  ngOnInit() {
    this.products = this.shopService.getProduct();
    console.log(this.shopService.getProduct());

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

  get getTotalPrice(){
    let totalPrice =  0;
    if(this.products.length > 0){
      for(let product of this.products){
        totalPrice = totalPrice + product.getTotalPrice();
      }
    }

    return this.formatPrice(totalPrice);
  }

}
