import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  
  bannerData: any = [];

  constructor( private api: ApiService){

  }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }

  getBannerData(){
    this.api.getTrendingCurrency('EUR')
    .subscribe( response =>{
      console.log(response)
      this.bannerData = response} 
    )}

  getAllData(){
    this.api.getCurrency('EUR').subscribe( response =>{
      console.log(response);
    })
  }

  

}
