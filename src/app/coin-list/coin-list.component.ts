import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  
  constructor( private api: ApiService){

  }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }

  getBannerData(){
    this.api.getTrendingCurrency('COP')
    .subscribe( response =>{console.log(response)} 
    )}

  getAllData(){
    this.api.getCurrency("COP").subscribe( response =>{
      console.log(response);
    })
  }

  

}
