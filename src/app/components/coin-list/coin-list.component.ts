import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { CurrencyService } from '../../services/currency/currency.service';
import { __values } from 'tslib';
import {  Coin } from 'src/app/interfaces/Coin.interface';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

  bannerData: Coin[] = [];

  currency : string = "USD"
  dataSource!: MatTableDataSource<Coin>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router, private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency().subscribe(
      value => {
        this.currency = value;
        this.getAllData();
        this.getBannerData();
      }
    )
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency)
      .subscribe(response => {
        this.bannerData = response
      }
      )
  }

  getAllData() {
    this.api.getCurrency(this.currency).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetails( row: any){
    this.router.navigate(['coin-detail', row.id])
  }
}



