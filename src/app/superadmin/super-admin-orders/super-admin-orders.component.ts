import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {HttpClientService} from '../../shared-services/http-client.service';
import {AuthService} from '../../shared-services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';

export interface OrderElement {
  Ordernummer: number;
  naam: string;
  email: string;
  Bedrijf: string;
  Postcode: string;
  Huisnummer: string;
  'Bestel datum': string;
  products: [];
  delivered: string;
}

@Component({
  selector: 'app-super-admin-orders',
  templateUrl: './super-admin-orders.component.html',
  styleUrls: ['./super-admin-orders.component.css']
})
export class SuperAdminOrdersComponent implements OnInit, OnDestroy {

  private orderSub
  private deliverySub
  private ELEMENT_DATA = [];

  public dataSource: MatTableDataSource<OrderElement>;
  public displayedColumns: string[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private httpClientService: HttpClientService, private authGuardService: AuthService, private toastr: ToastrService) {
    this.displayedColumns = ['Ordernummer', 'naam', 'email', 'Bedrijf', 'Postcode', 'Huisnummer', 'Besteldatum', 'delivered'];
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }

    if(this.deliverySub){
      this.deliverySub.unsubscribe();
    }
  }
  private getAllOrders(){
    this.orderSub = this.httpClientService.onGetWithHeader('/order/getAllOrders').subscribe((orders) => {
      this.setElementData(orders);
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
  }
  private setElementData(orderArr) {
    this.ELEMENT_DATA = [];
    let i = 0;
    orderArr.forEach(dateOe => {
      i++;
      this.ELEMENT_DATA.push({
        products: dateOe.products, Ordernummer: dateOe.orderId, naam: dateOe.contact.name,
        email: dateOe.contact.email, Bedrijf: dateOe.contact.company,
        Postcode: dateOe.contact.postalcode, Huisnummer: dateOe.contact.housenumber,
        Besteldatum: this.formatDate(new Date(dateOe.orderDate)), delivered: dateOe.delivered});
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    // this.onDataInit();
  }

  private formatDate(date) {

    let month = '' + (date.getMonth() + 1);
    let   day = '' + date.getDate()
    const year = date.getFullYear();

    if (month.length < 2){
      month = '0' + month;
    }
    if (day.length < 2){
      day = '0' + day;
    }

    return [day, month, year].join('-');
  }

  public setDelivery(id, status){
    this.orderSub = this.httpClientService.onPostWithHeader('/order/setDelivery/'+id, status).subscribe((result) => {
      if (result === 1){
        this.getAllOrders();
      } else {
        this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
      }
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
  }
}
