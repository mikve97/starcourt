export class ProductModel {
  private productId: number;
  private name: string;
  private description: string;
  private price: number;
  private categoryId: number;
  private categoryName: string;

  private productAmount: number;

  constructor(productId, productName, productDescr, productPrice, catId,  categoryName) {
    this.productId = productId;
    this.name = productName;
    this.description = productDescr;
    this.price = productPrice;
    this.categoryId = catId;
    this.categoryName = categoryName;

    this.productAmount = 1;
  }

  public getProductId() {
    return this.productId;
  }

  public setProductId(productId) {
    this.productId = productId;
  }

  public getProductName() {
    return this.name;
  }

  public setProductName(productName) {
    this.name = productName;
  }

  public getProductDescr() {
    return this.description;
  }

  public setProductDescr(productDescr) {
    this.description = productDescr;
  }

  public getProductPrice() {
    return this.price;
  }

  public setProductPrice(productPrice) {
    this.price = productPrice;
  }

  public getTotalPrice(){
    return this.price * this.productAmount;
  }

  public getProductCategoryId(){
    return this.categoryId;
  }

  public getProductCategoryName() {
    return this.categoryName;
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


}
