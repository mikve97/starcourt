import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClientService} from '../../shared-services/http-client.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-super-admin-home',
  templateUrl: './super-admin-home.component.html',
  styleUrls: ['./super-admin-home.component.css']
})
export class SuperAdminHomeComponent implements OnInit, OnDestroy {

  public amountOfOrders;
  public amountOfUsers;

  private orderSub;
  private userSub;

  constructor(private httpClientService: HttpClientService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  private getAllOrders() {
    this.orderSub = this.httpClientService.onGetWithHeader('/order/countAllOrders/').subscribe((orders) => {
        this.amountOfOrders = orders;
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
  }

  private getAllUsers() {
    this.userSub = this.httpClientService.onGetWithHeader('/user/countAllUsers/').subscribe((users) => {
      this.amountOfUsers = users;
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
  }
}
