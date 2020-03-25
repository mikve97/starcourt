import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontpageComponent } from './frontpage/frontpage.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PostalcodeDirective} from '../validators/postalcode.directive';



@NgModule({
  declarations: [FrontpageComponent, PostalcodeDirective],
  exports: [
    FrontpageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
