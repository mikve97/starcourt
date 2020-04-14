import {ProductModel} from "./product.model";

export class OrdersProductModel {

  private id: number;
  private orderId: number;
  private productId: number;
  private productAmount: number;
  private pm: ProductModel;

  public constructor(orderProductId: number, orderId: number, productId: number, productAmount: number, pm: ProductModel) {
    this.id = orderProductId;
    this.orderId = orderId;
    this.productId = productId;
    this.productAmount = productAmount;
    this.pm = pm;
  }

  public getId() {
    return this.id;
  }

  public setId(orderProductId) {
    return this.id = orderProductId;
  }

  public getOrderId() {
    return this.orderId;
  }

  public setOrderId(orderId) {
    return this.orderId = orderId;
  }

  public getproductId() {
    return this.orderId;
  }

  public setproductId(productId) {
    return this.productId = productId;
  }

  public getProductAmount() {
    return this.productAmount;
  }

  public setProductAmount(productAmount) {
    return this.productAmount = productAmount;
  }

  public getProducts() {
    return this.pm;
  }

  public setProducts(products: ProductModel) {
    return this.pm = products;
  }



}
