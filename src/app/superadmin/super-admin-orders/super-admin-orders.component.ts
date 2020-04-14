import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {HttpClientService} from '../../shared-services/http-client.service';
import {AuthService} from '../../shared-services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface OrderElement {
  Ordernummer: number;
  Naam: string;
  Email: string;
  Bedrijf: string;
  Postcode: string;
  Huisnummer: string;
  'Bestel datum': string;
  products: [];
  Afgeleverd: string;
}

@Component({
  selector: 'app-super-admin-orders',
  templateUrl: './super-admin-orders.component.html',
  styleUrls: ['./super-admin-orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SuperAdminOrdersComponent implements OnInit, OnDestroy {

  private orderSub;
  private deliverySub;

  public ELEMENT_DATA: OrderElement[] = [  ];
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<OrderElement>;
  public expandedElement: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private httpClientService: HttpClientService, private authGuardService: AuthService, private toastr: ToastrService) {
    this.displayedColumns = ['Ordernummer', 'Naam', 'Email', 'Bedrijf', 'Postcode', 'Huisnummer', 'Bestel datum', 'Afgeleverd'];
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

  private onDataInit() {
    this.sort.sort({ id: 'Ordernummer', start: 'desc', disableClear: false });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setElementData(orderArr) {
    this.ELEMENT_DATA = [];
    let i = 0;
    orderArr.forEach(dateOe => {
      i++;
      this.ELEMENT_DATA.push({
        products: dateOe.products, Ordernummer: dateOe.orderId, Naam: dateOe.contact.name,
        Email: dateOe.contact.email, Bedrijf: dateOe.contact.company,
        Postcode: dateOe.contact.postalcode, Huisnummer: dateOe.contact.housenumber,
        'Bestel datum': this.formatDate(new Date(dateOe.orderDate)), Afgeleverd: dateOe.delivered});
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.onDataInit();
  }

  private formatDate(date) {

    let month = '' + (date.getMonth() + 1);
    let   day = '' + date.getDate();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
