import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector:
    '[isPostalcode][formControlName],[isPostalcode][formControl],[isPostalcode][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PostalcodeDirective),
      multi: true
    }
  ]
})
export class PostalcodeDirective implements Validator {

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    const postalcode = c.value.toUpperCase();
    if ( postalcode.length === 0 ) {
      return null;
    }
    const pattern  = /[1-9][0-9]{3}([A-RT-Z][A-Z]|[S][BCE-RT-Z])/;

    if ( postalcode.match(pattern ) && postalcode.length === 6 ) {
      return null;
    } else {
      return {
        postalcodeError: {
          valid: false
        }
      };
    }


  }

}
