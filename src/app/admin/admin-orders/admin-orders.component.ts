import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClientService} from '../../shared-services/http-client.service';
import {AuthService} from '../../shared-services/auth/auth.service';
import {MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastrService} from 'ngx-toastr';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";



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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

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

  private onDataInit() {
    this.sort.sort({ id: 'Ordernummer', start: 'desc', disableClear: false });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setElementData(orderArray) {
    let i = 0;
    orderArray.forEach(dateOe => {
      i++;
      this.ELEMENT_DATA.push({
        products: dateOe.products, Ordernummer: dateOe.orderId, naam: dateOe.contact.name,
        email: dateOe.contact.email, Bedrijf: dateOe.contact.company,
        Postcode: dateOe.contact.postalcode, Huisnummer: dateOe.contact.housenumber,
        'Bestel datum': this.formatDate(new Date(dateOe.orderDate))});
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.onDataInit();
  }

  private formatDate(date) {

    let month = '' + (date.getMonth() + 1);
    let   day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('-');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}


