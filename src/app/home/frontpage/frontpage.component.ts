import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostalcodeService} from '../../shared-services/postalcode.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  private postalcodeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private pcService: PostalcodeService, private router: Router) {


  }

  // convenience getter for easy access to form fields
  get getForm() { return this.postalcodeForm.controls; }

  ngOnInit() {
    this.postalcodeForm = this.formBuilder.group({
      postalcode: ['', Validators.required, this.postalCodeCheck.bind(this)]
    });
  }

  public order(postalcode) {
    // stop here if form is invalid
    if (this.postalcodeForm.invalid) {
      return;
    } else {
      this.router.navigate(['shop/' + postalcode.postalcode]);
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
}
