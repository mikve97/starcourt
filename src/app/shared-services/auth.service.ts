import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpClientService} from './http-client.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor( private httpService: HttpClientService, private toastr: ToastrService ) {
  }

  public login(email: string, password: string ) {
    const credentialModel = {
      email,
      password
    };

    this.httpService.onPost('/auth/login', credentialModel).subscribe((jwtToken) => {
      console.log(jwtToken);
      if (jwtToken != null){
        localStorage.setItem('token', jwtToken);
      }else{
        this.toastr.error("Uw gebruikersnaam of wachtwoord is fout.", "Helaas!");
      }
    });
  }
}
