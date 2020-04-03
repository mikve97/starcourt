import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from './login/login.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ShopModule} from './shop/shop.module';
import {PostalcodeDirective} from './validators/postalcode.directive';
import { ToastrModule } from 'ngx-toastr';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {GuardService} from './shared-services/auth/guard.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    ShopModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()

  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    GuardService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
