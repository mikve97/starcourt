import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared-services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  public loggedIn;
  private authSub;
  constructor(private auth: AuthService) {
    this.auth.loggedIn.subscribe((value) => this.loggedIn = value);
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  ngOnDestroy(): void {
    if(this.authSub){
      this.authSub.unsubscribe();
    }
  }

  public removeToken(){
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

}
