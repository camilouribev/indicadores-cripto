import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { GraphicalData } from 'src/app/interfaces/GraphicalData.interface';
import { Coin } from 'src/app/interfaces/Coin.interface';
import { CoinData } from 'src/app/interfaces/CoinData.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  getCurrency( currency: string){
    return this.http
    .get<Coin[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&parkline=false`);
  }

  getTrendingCurrency(currency : string){
    return this.http
    .get<Coin[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)

  }

  getGraphicalCurrencyData( coinId: string, currency: string, days: number){
    return this.http.get<GraphicalData>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)

  }

  getCurrencyById( coinId: string){
    return this.http.get<CoinData>(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  }
}
