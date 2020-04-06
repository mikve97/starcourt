import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector:
    '[isEmail][formControlName],[isEmail][formControl],[isEmail][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailDirective),
      multi: true
    }
  ]
})
export class EmailDirective implements Validator {

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    const email = c.value.toUpperCase();
    if ( email.length === 0 ) {
      return null;
    }
    const pattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( email.match(pattern )) {
      return null;
    } else {
      return {
        emailError: {
          valid: false
        }
      };
    }


  }

}
