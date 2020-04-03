import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {HttpClientService} from '../shared-services/http-client.service';
import {Auth} from '../shared-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private submitted: boolean;

  constructor(private formBuilder: FormBuilder, private authService: Auth) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  // convenience getter for easy access to form fields
  get getForm() { return this.loginForm.controls; }

  ngOnInit() {
  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    }

  }


}
