import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import {RouterModule} from '@angular/router';
import { AdminAccountDetailsComponent } from './admin-account-details/admin-account-details.component';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [AdminMenuComponent, AdminOrdersComponent, AdminAccountDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ]
})
export class AdminModule { }
