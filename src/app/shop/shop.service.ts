import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ProductModel} from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public productChanged = new Subject<ProductModel[]>();
  private productArray = [];
  constructor() { }

  public addProduct(productModel: ProductModel) {
    let productFound = false;
    if (this.productArray.length > 0) {
      for ( let product of this.productArray) {
        if ( product.getProductId() === productModel.getProductId()) {
          product.addAmount();
          productFound = true;
        }
      }
    }

    if (!productFound) {
      this.productArray.push(productModel);
    }

    //update basker
    this.productChanged.next(this.productArray);
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
    this.productChanged.next(this.productArray);
  }

  public removeProductById(productId){
    if (this.productArray.length > 0) {
      for ( let i = 0; i < this.productArray.length; i++) {
        if ( this.productArray[i].getProductId() === productId) {
          this.productArray[i].substractAmount();

          //Remove product if the amount is 0
          if (this.productArray[i].getProductAmount() === 0) {
            this.productArray.splice(i,i + 1);
          }

        }
      }
    }

    //Update basket
    this.productChanged.next(this.productArray);
  }

  public emptyCart(){
    this.productArray = [];
  }

  public getProduct(){
    return this.productArray;
  }
}
