import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopService} from '../shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {PostalcodeService} from '../../shared-services/postalcode.service';
import {HttpClientService} from '../../shared-services/http-client.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared-services/auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public checkoutForm: FormGroup;
  public loginForm: FormGroup;
  public submitted: boolean;
  public loginSub;
  public loggedIn: boolean;

  private orderSub;
  private contactSub;

  public postalCode;
  public products = [];
  constructor(private formBuilder: FormBuilder, private shopService: ShopService, private pcService: PostalcodeService, private httpclient: HttpClientService, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.postalCode = this.activatedRoute.snapshot.params.postalcode;

    if(localStorage.getItem('token')) {
      this.getUserInformation();
    }
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

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginSub = this.authService.loggedIn.subscribe((value) =>{
      if ( value === true) {
        this.getUserInformation();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }

    if(this.loginSub){
      this.loginSub.unsubscribe();
    }

    if (this.contactSub){
      this.contactSub.unsubscribe();
    }
  }

  public get getForm(){
    return this.checkoutForm.controls;
  }

  public get getFormLogin(){
    return this.loginForm.controls;
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
      this.orderSub = this.httpclient.onPost('/order/setNewOrder', orderToBeMade).subscribe((returnValue) => {
        this.router.navigate(['shop/thankyou']);

      }, error => {
        this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
      });
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
    let user;
    if(localStorage.getItem('token')){
       user = {
        email: this.checkoutForm.get('email').value,
        password: 'Existing_user'
      };
    } else {
       user = {
        email: this.checkoutForm.get('accountemail').value,
        password: this.checkoutForm.get('accountpassword').value
      };
    }
    return user;
  }

  public login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    }
  }

  private getUserInformation() {
    this.loggedIn = true;
    this.orderSub = this.httpclient.onGetWithHeader('/contact/getContactFavorite/' + this.authService.getUserId()).subscribe((result) => {
      this.setForm(result)
    }, error => {
      this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
    });
  }

  private setForm(contactInfo) {
      this.checkoutForm.get('accountemail').disable();
      this.checkoutForm.get('accountpassword').disable();
      this.loginForm.get('email').setValue('');
      this.loginForm.get('email').disable();
      this.loginForm.get('password').setValue('');
      this.loginForm.get('password').disable();
      this.checkoutForm.patchValue({postalcode: contactInfo.postalcode,
                                          housenumber: contactInfo.housenumber,
                                          name: contactInfo.name,
                                          email: contactInfo.email,
                                          phonenumber: contactInfo.phonenumber,
                                          companyname: contactInfo.companyname});
  }
}
