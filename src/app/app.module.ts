import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from './login/login.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ShopModule} from './shop/shop.module';
import { ToastrModule } from 'ngx-toastr';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {GuardService} from './shared-services/auth/guard.service';
import {AdminModule} from './admin/admin.module';
import {SuperadminModule} from './superadmin/superadmin.module';
import {RoleGuardService} from './shared-services/auth/roleguard.service';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    ShopModule,
    AdminModule,
    SuperadminModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    GuardService,
    RoleGuardService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
