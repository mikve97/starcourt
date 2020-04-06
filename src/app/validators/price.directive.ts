import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector:
    '[isPrice][formControlName],[isPrice][formControl],[isPrice][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PriceDirective),
      multi: true
    }
  ]
})
export class PriceDirective implements Validator {

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    let price = c.value
    let tooLong = false;
    if ( price.length === 0 ) {
      return null;
    }
    if( price.includes(',')){
      price.replace(',', '.');
    }

    if (price.includes('.')) {
      const priceSplit = price.split('.');
      if(priceSplit[1].length > 2){
        tooLong = true;
      }
    }

    price = parseFloat(price);

    if ( !isNaN(price) && !tooLong) {
      return null;
    } else {
      return {
        priceError: {
          valid: false
        }
      };
    }


  }

}
