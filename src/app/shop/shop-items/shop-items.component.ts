import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopService} from '../shop.service';
import {ProductModel} from '../product.model';
import {HttpClientService} from '../../shared-services/http-client.service';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.css']
})
export class ShopItemsComponent implements OnInit, OnDestroy {
  private productSubscribe;
  public products = [];
  constructor(private shop: ShopService, private httpService: HttpClientService) { }

  ngOnInit() {
    this.productSubscribe = this.httpService.onGet('/product/getAllProducts' ).subscribe(value => this.products = value ) ;
  }

  ngOnDestroy(): void {
    this.productSubscribe.unsubscribe();
  }

  public addToCart(id, name, description, price, catId, catName) {
    this.shop.addProduct(new ProductModel(id, name, description, price, catId, catName));
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
        formattedPrice = formattedPrice[0]+ ','+formattedPrice[0][0]+formattedPrice[0][1];
      }
    } else {
      formattedPrice = price+ ',00';
    }


    return formattedPrice;
  }


}
