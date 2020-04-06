import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../shared-services/http-client.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-super-admin-add-product',
  templateUrl: './super-admin-add-product.component.html',
  styleUrls: ['./super-admin-add-product.component.css']
})
export class SuperAdminAddProductComponent implements OnInit, OnDestroy {


  public productForm: FormGroup;
  public submitted: boolean
  public categories = [];

  private catSub;


  constructor(private formBuilder: FormBuilder, private httpClientService: HttpClientService, private toastr: ToastrService, private router: Router) {

    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productCat: ['', [Validators.required]],

    });

    this.getAllCategories();

  }

  // convenience getter for easy access to form fields
  get getForm() { return this.productForm.controls; }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.catSub){
      this.catSub.unsubscribe();
    }
  }

  private getAllCategories(){
    this.catSub = this.httpClientService.onGetWithHeader('/product/getAllCategories/').subscribe((cat) => {
      this.categories = cat;
    });
  }

  public submitProduct() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    } else {
      const price = this.formatPrice(this.productForm.get('productPrice').value);
      console.log(price);
      const newProductModel = {
        name: this.productForm.get('productName').value,
        productDescription: this.productForm.get('productDescription').value,
        productPrice: price,
        productCatId: this.productForm.get('productCat').value
      };
      console.log(newProductModel);
      this.httpClientService.onPostWithHeader('/product/setProduct', newProductModel).subscribe((result) => {
        this.toastr.success("Het product is aangemaakt", "Hooray!");
        this.router.navigate(['superadmin/products']);
      }, error => {
        this.toastr.error("Er is iets fout gegaan, probeer het nogmaals", "Oepsie!");
      });


    }
  }

  private formatPrice(price) {

    if( price.includes(',')) {
      console.log("True?");
      price = price.replace(',', '.');
    }

    if (price.includes('.')) {
      const priceSplit = price.split('.');
      if (priceSplit[1].length === 1){
        price = priceSplit[0];
      }
    }

    return price;
  }

}
