import {NgModule} from '@angular/core';
import {AppComponent} from '../app.component';
import {PostalcodeDirective} from './postalcode.directive';
import {EmailDirective} from './email.directive';
import {PhoneDirective} from './phone.directive';
import {PriceDirective} from './price.directive';

@NgModule({
  declarations: [
    EmailDirective,
    PostalcodeDirective,
    PhoneDirective,
    PriceDirective
  ],
  imports: [

  ],
  providers: [],
  exports: [
    PostalcodeDirective,
    EmailDirective,
    PhoneDirective,
    PriceDirective
  ],
  bootstrap: [AppComponent]
})
export class ValidateModule { }
