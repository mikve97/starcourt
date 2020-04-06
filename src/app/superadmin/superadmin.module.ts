import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { SuperAdminMenuComponent } from './super-admin-menu/super-admin-menu.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import { SuperAdminProductsComponent } from './super-admin-products/super-admin-products.component';
import { SuperAdminAddProductComponent } from './super-admin-add-product/super-admin-add-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidateModule} from '../validators/validate.module';
import { SuperAdminOrdersComponent } from './super-admin-orders/super-admin-orders.component';




@NgModule({
  declarations: [SuperAdminHomeComponent, SuperAdminMenuComponent, SuperAdminProductsComponent, SuperAdminAddProductComponent, SuperAdminOrdersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    ValidateModule
  ]
})
export class SuperadminModule { }
