import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {HttpClientService} from '../../shared-services/http-client.service';
import {AuthService} from '../../shared-services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {MatPaginator} from "@angular/material/paginator";



export interface ContactElement {
  id: number;
  name: string;
  email: string;
  company: string;
  postalcode: string;
  number: string;
  favorite: boolean;
}

@Component({
  selector: 'app-admin-account-details',
  templateUrl: './admin-account-details.component.html',
  styleUrls: ['./admin-account-details.component.css']
})
export class AdminAccountDetailsComponent implements OnInit, OnDestroy {
  public  ELEMENT_DATA: ContactElement[] = [  ];
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<ContactElement>;
  private currentFavorite;
  private contactSub;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private httpClientService: HttpClientService, private authGuardService: AuthService, private toastr: ToastrService) {
    this.displayedColumns = ['id', 'name', 'email', 'company', 'postalcode', 'number', 'favorite'];


  }

  ngOnInit(): void {
    this.getFormData();
  }

  ngOnDestroy(): void {
    if (this.contactSub) {
      this.contactSub.unsubscribe();
    }
  }

  private getFormData(){
    const userId = this.authGuardService.getUserId();
    this.ELEMENT_DATA = [];
    this.contactSub = this.httpClientService.onGetWithHeader('/contact/getContact/' + userId).subscribe((contactModel) => {
      this.setElementData(contactModel);
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
  }

  private onDataInit() {
    this.sort.sort({ id: 'id', start: 'desc', disableClear: false });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setElementData(conactArray) {
    conactArray.forEach(dataCe => {
      this.ELEMENT_DATA.push({id: dataCe.contactNawId, name: dataCe.name, email: dataCe.email, company: dataCe.company, postalcode: dataCe.postalcode, number: dataCe.housenumber, favorite: dataCe.favorite});
      if (dataCe.favorite === true) {
        this.currentFavorite = dataCe.contactNawId;
      }
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.onDataInit();
  }

  public favoriteAdress(contactNawId){
    const favoriteArray = [ this.currentFavorite, contactNawId];
    this.httpClientService.onPostWithHeader('/contact/changeFavorite', favoriteArray).subscribe((result) => {
      if(result){
        this.getFormData();
      }
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
