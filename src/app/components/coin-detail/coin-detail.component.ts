import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../../services/currency/currency.service';
import { CoinData } from 'src/app/interfaces/CoinData.interface';


@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {

  coinData!: CoinData;
  coinId!: string;
  days: number = 1;
  currency: string = "EUR"

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.coinId = value['id']
    });

    this.getCoinData();
    this.getGraphData(this.days);
    this.currencyService.getCurrency().subscribe(value => {
      this.currency = value;
      this.getGraphData(this.days);
      this.getCoinData();
    });
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId)
      .subscribe(response => {
        this.coinData = response;

        if (this.currency === 'USD') {
          response.market_data.current_price['eur'] = response.market_data.current_price['usd']
          response.market_data.market_cap['eur'] = response.market_data.market_cap['usd']
        }

        this.coinData = response;

      })
  }

  getGraphData(days: number) {
    this.days = days;

    this.api.getGraphicalCurrencyData(this.coinId, this.currency, days)
      .subscribe(response => {
        setTimeout(() => { this.myLineChart.chart?.update(); }, 200);
        this.lineChartData.datasets[0].data = response.prices.map((a: Array<number>) => {
          return a[1];
        })
        this.lineChartData.labels = response.prices.map((a: Array<number>) => {
          let date = new Date(a[0]);
          let time = date.getHours() > 12 ?
            `${date.getHours() - 12}: ${date.getMinutes()} PM` :
            `${date.getHours() - 12}: ${date.getMinutes()} AM`
          return days === 1 ? time : date.toLocaleTimeString();
        })
      })

  }

}
