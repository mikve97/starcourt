import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {HttpClientService} from '../http-client.service';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import {Router} from '@angular/router';
import {ProductModel} from '../../shop/product.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private loginSub;
  public loggedIn = new Subject<boolean>();
  constructor( private httpService: HttpClientService, private toastr: ToastrService, private jwtHelper: JwtHelperService ) {
  }

  ngOnDestroy(): void {
    if(this.loginSub){
      this.loginSub.unsubscribe();
    }
  }

  public login(email: string, password: string  ) {
    const credentialModel = {
      email,
      password
    };

    this.loginSub = this.httpService.onPost('/auth/login', credentialModel).subscribe((jwtToken) => {
      if (jwtToken != null) {
        localStorage.setItem('token', jwtToken);
        this.loggedIn.next(true);

      } else {
        this.toastr.error("Uw gebruikersnaam of wachtwoord is fout.", "Helaas!");
      }
    });
  }
  // Check if user is authenticated
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getUserId() {
    const token = localStorage.getItem('token');
    if( token && !this.jwtHelper.isTokenExpired(token)){
      const decodedToken = decode(token);
      return decodedToken.userId;
    }

  }

  public logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
