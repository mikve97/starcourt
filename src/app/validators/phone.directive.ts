import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector:
    '[isPhone][formControlName],[isPhone][formControl],[isPhone][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneDirective),
      multi: true
    }
  ]
})
export class PhoneDirective implements Validator {

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    let phone = c.value;
    if ( phone.length === 0 ) {
      return null;
    }

    if ( phone.includes('+')){
      phone = phone.replace('+', '00');
    }

    const defaultNumber = /^(((0)[1-9]{2}[0-9][-]?[1-9][0-9]{5})|((\\+31|0|0031)[1-9][0-9][-]?[1-9][0-9]{6}))$/;
    const mobileNumber = /^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/;

    if ( phone.match(defaultNumber ) || phone.match(mobileNumber) ) {
      return null;
    } else {
      return {
        phoneError: {
          valid: false
        }
      };
    }


  }

}
