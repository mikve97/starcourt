import {NgModule} from '@angular/core';
import {AppComponent} from '../app.component';
import {PostalcodeDirective} from './postalcode.directive';
import {EmailDirective} from './email.directive';
import {PhoneDirective} from './phone.directive';

@NgModule({
  declarations: [
    EmailDirective,
    PostalcodeDirective,
    PhoneDirective
  ],
  imports: [

  ],
  providers: [],
  exports: [
    PostalcodeDirective,
    EmailDirective,
    PhoneDirective
  ],
  bootstrap: [AppComponent]
})
export class ValidateModule { }
