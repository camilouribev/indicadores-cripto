import { Component } from '@angular/core';
import { CurrencyService } from './services/currency/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedCurrency: string = "COP"
  constructor( private currencyService : CurrencyService){
     
  }

  sendCurrency( event : string ){
    console.log(event);

    this.currencyService.setCurrency(event);
    
  }
}
