import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClientService} from '../../shared-services/http-client.service';

@Component({
  selector: 'app-super-admin-menu',
  templateUrl: './super-admin-menu.component.html',
  styleUrls: ['./super-admin-menu.component.css']
})
export class SuperAdminMenuComponent implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
