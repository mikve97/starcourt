import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private submitted: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  // convenience getter for easy access to form fields
  get getForm() { return this.loginForm.controls; }

  ngOnInit() {
  }

  login(loginData) {
    this.submitted = true;
    // Process checkout data here
    console.log('Your order has been submitted', loginData);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

  }


}
