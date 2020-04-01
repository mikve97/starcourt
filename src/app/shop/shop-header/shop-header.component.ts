import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.css']
})
export class ShopHeaderComponent implements OnInit {
  public postalcode;
  constructor( private activatedRoute: ActivatedRoute) {
    this.postalcode = this.activatedRoute.snapshot.params.postalcode;
  }

  ngOnInit() {
  }

}