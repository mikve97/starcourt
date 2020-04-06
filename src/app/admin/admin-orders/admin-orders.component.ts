import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClientService} from '../../shared-services/http-client.service';
import {AuthService} from '../../shared-services/auth/auth.service';
import {MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
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
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  constructor(private httpClientService: HttpClientService, private authGuardService: AuthService, private toastr: ToastrService) {
    this.displayedColumns = ['Ordernummer', 'naam', 'email', 'Bedrijf', 'Postcode', 'Huisnummer', 'Bestel datum'];
  }

  public  ELEMENT_DATA: OrderElement[] = [  ];
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<OrderElement>;
  public expandedElement: any;

  private orderSub;

  ngOnInit(): void {
    const userId = this.authGuardService.getUserId();
    this.ELEMENT_DATA = [];
    this.orderSub = this.httpClientService.onGetWithHeader('/order/getOrderFromUser/' + userId).subscribe((orders) => {
      this.setElementData(orders);
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  private setElementData(conactArray) {
    let i = 0;
    conactArray.forEach(dateOe => {
      i++;
      this.ELEMENT_DATA.push({
        products: dateOe.products, Ordernummer: dateOe.orderId, naam: dateOe.contact.name,
        email: dateOe.contact.email, Bedrijf: dateOe.contact.company,
        Postcode: dateOe.contact.postalcode, Huisnummer: dateOe.contact.housenumber,
        'Bestel datum': this.formatDate(new Date(dateOe.orderDate))});
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


}


