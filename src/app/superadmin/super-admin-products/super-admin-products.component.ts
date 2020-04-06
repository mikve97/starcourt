import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClientService} from '../../shared-services/http-client.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ContactElement} from '../../admin/admin-account-details/admin-account-details.component';
import {ToastrService} from 'ngx-toastr';


export interface ProductElement {
  id: number;
  naam: string;
  description: string;
  price: string;
  categorie: number;
  catId: string;
  inStock: boolean;
}

@Component({
  selector: 'app-super-admin-products',
  templateUrl: './super-admin-products.component.html',
  styleUrls: ['./super-admin-products.component.css']
})
export class SuperAdminProductsComponent implements OnInit, OnDestroy {
  private productSub;
  private stockSub
  private ELEMENT_DATA = [];

  public dataSource: MatTableDataSource<ProductElement>;
  public displayedColumns: string[];

   @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private httpClientService: HttpClientService, private toastr: ToastrService) {
    this.displayedColumns = ['id', 'name', 'description', 'category', 'price', 'catId', 'inStock'];
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    if (this.productSub){
      this.productSub.unsubscribe();
    }

    if (this.stockSub){
      this.stockSub.unsubscribe();
    }
  }

  private onDataInit() {
    this.sort.sort({ id: 'id', start: 'desc', disableClear: false });
    this.dataSource.sort = this.sort;
  }

  private getAllProducts() {
    this.productSub = this.httpClientService.onGetWithHeader('/product/getAllProducts').subscribe((products) => {

      this.setElementData(products);
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
  }

  private setElementData(productArray) {
    this.ELEMENT_DATA = [];
    productArray.forEach(dataPe => {
      this.ELEMENT_DATA.push({id: dataPe.productId, name: dataPe.name,
        description: dataPe.description, price: dataPe.price,  category: dataPe.categoryName, catId: dataPe.categoryId, inStock: dataPe.inStock
        });
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.onDataInit();
  }

  public changeStock(productId, inStock) {
    this.stockSub = this.httpClientService.onPostWithHeader('/product/changeStock/'+ productId, inStock).subscribe((result) => {
      if (result === 1){
        this.getAllProducts();
      } else {
        this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
      }
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
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
