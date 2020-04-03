import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontpageComponent } from './frontpage/frontpage.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidateModule} from '../validators/validate.module';



@NgModule({
  declarations: [FrontpageComponent],
  exports: [
    FrontpageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidateModule
  ]
})
export class HomeModule { }
