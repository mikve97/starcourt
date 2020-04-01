import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ProductModel} from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public productChanged = new Subject<ProductModel[]>();
  private productArray: ProductModel[] = [];
  constructor() { }

  public addProduct(productModel: ProductModel) {
    if (this.productArray.length > 0) {
      for ( let product of this.productArray) {
        if ( product.getProductId() === productModel.getProductId()) {
          product.addAmount();
        }
      }
    } else {
      this.productArray.push(productModel);
    }


    //update basker
    this.productChanged.next(this.productArray.slice());
  }

  public addProductById(productId){
    if (this.productArray.length > 0) {
      for ( let product of this.productArray) {
        if ( product.getProductId() === productId) {
          product.addAmount();
        }
      }
    }

    //Update basket
    this.productChanged.next(this.productArray.slice());
  }

  public removeProductById(productId){
    if (this.productArray.length > 0) {
      for ( let product of this.productArray) {
        if ( product.getProductId() === productId) {
          product.substractAmount();

          //Remove product if the amount is 0
          if (product.getProductAmount() === 0){
            this.productArray.pop();
          }

        }
      }
    }

    //Update basket
    this.productChanged.next(this.productArray.slice());
  }

}
