export class ProductModel {
  private productId: number;
  private productName: string;
  private productDescr: string;
  private productPrice: number;
  private productAmount: number;

  constructor(productId, productName, productDescr, productPrice) {
    this.productId = productId;
    this.productName = productName;
    this.productDescr = productDescr;
    this.productPrice = productPrice;
    this.productAmount = 1;
  }

  public getProductId() {
    return this.productId;
  }

  public setProductId(productId) {
    this.productId = productId;
  }

  public getProductName() {
    return this.productName;
  }

  public setProductName(productName) {
    this.productName = productName;
  }

  public getProductDescr() {
    return this.productDescr;
  }

  public setProductDescr(productDescr) {
    this.productDescr = productDescr;
  }

  public getProductPrice() {
    return this.productPrice;
  }

  public setProductPrice(productPrice) {
    this.productPrice = productPrice;
  }
  public getProductAmount() {
    return this.productAmount;
  }
  public addAmount() {
    this.productAmount = this.productAmount + 1;
  }

  public substractAmount() {
    this.productAmount = this.productAmount - 1;
  }

  public getTotalPrice(){
    return this.productPrice * this.productAmount;
  }


}
