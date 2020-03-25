import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from './login/login.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
