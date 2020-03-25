import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  private postalcodeForm: FormGroup;
  private submitted: boolean;

  constructor(private formBuilder: FormBuilder) {


  }

  // convenience getter for easy access to form fields
  get getForm() { return this.postalcodeForm.controls; }

  ngOnInit() {
    this.postalcodeForm = this.formBuilder.group({
      postalcode: ['', Validators.required]
    });
  }
  public order(postalcode) {
    this.submitted = true;
    console.log(this.postalcodeForm.controls.postalcode.errors);
    // stop here if form is invalid
    if (this.postalcodeForm.invalid) {
      return;
    }
    console.log('test', postalcode);
  }
}
