import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopService} from '../shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {PostalcodeService} from '../../shared-services/postalcode.service';
import {HttpClientService} from '../../shared-services/http-client.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private checkoutForm: FormGroup;
  private orderSub;

  public postalCode;
  public products = [];
  constructor(private formBuilder: FormBuilder, private shopService: ShopService, private pcService: PostalcodeService, private httpclient: HttpClientService, private activatedRoute: ActivatedRoute) {
    this.postalCode = this.activatedRoute.snapshot.params.postalcode;
  }

  ngOnInit() {
    this.products = this.shopService.getProduct();
    this.checkoutForm = this.formBuilder.group({
      postalcode: [this.postalCode, Validators.required, this.postalCodeCheck.bind(this)],
      housenumber: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required],
      companyname: [''],
      notes: [''],
      ordertime: [''],
      accountemail: [''],
      accountpassword: ['']
    });
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }

  public get getForm(){
    return this.checkoutForm.controls;
  }

  public formatPrice(price) {
    let formattedPrice;
    price = price.toString();

    if( price.includes('.') ) {
      formattedPrice = price.replace('.', ',');
      const checkLength = price.split('.');
      if (checkLength[1].length === 1) {
        formattedPrice = formattedPrice + '0';
      }else if(checkLength[1].length > 2){
        formattedPrice = formattedPrice.split(',');
        formattedPrice = formattedPrice[0]+ ','+formattedPrice[1].substr(0,2);
      }
    } else {
      formattedPrice = price+ ',00';
    }


    return formattedPrice;
  }

  get getTotalPrice(){
    let totalPrice =  0;
    if(this.products.length > 0){
      for(let product of this.products){
        totalPrice = totalPrice + product.getTotalPrice();
      }
    }

    return this.formatPrice(totalPrice);
  }

  public makeOrder() {
    console.log(this.checkoutForm)
    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
      return;
    }else{
      const formObj = this.getFormObject();
      let orderToBeMade;
      orderToBeMade = {
        contactNaw: JSON.stringify(formObj),
        products: JSON.stringify(this.products),
        newAccount: JSON.stringify(this.getUserObject()),

      };
      // orderInformation: JSON.stringify({
      //   notes: this.checkoutForm.get('notes').value,
      //   ordertime: this.checkoutForm.get('ordertime').value,
      // }),
      this.orderSub = this.httpclient.onPost('/order/setNewOrder', orderToBeMade).subscribe(() => {
        console.log("REQUEST GEMAAKT");
      });
      console.log(this.orderSub);
    }
  }

  private postalCodeCheck(control: AbstractControl) {

    return this.pcService.checkPostalCode(control.value)
      .pipe(
        map(res => {
          if (res) {
            return null;
          } else {
            return {unkownPostalCode: true};
          }
        })
      );
  }

  private getFormObject() {
    const contactNaw = {
      postalcode: this.checkoutForm.get('postalcode').value,
      housenumber: this.checkoutForm.get('housenumber').value,
      name: this.checkoutForm.get('name').value,
      email: this.checkoutForm.get('email').value,
      phonenumber: this.checkoutForm.get('phonenumber').value,
      companyname: this.checkoutForm.get('companyname').value,
    };
    return contactNaw;
  }

  private getUserObject() {
    const user = {
      email: this.checkoutForm.get('accountemail').value,
      password: this.checkoutForm.get('accountpassword').value
    };

    return user;
  }
}
