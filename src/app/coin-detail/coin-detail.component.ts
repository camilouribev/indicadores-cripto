import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType} from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'; 

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {

  coinData : any;
  coinId! : string;
  days : number = 1;
  currency : string = "EUR"

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

  constructor(private api : ApiService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( value =>{
      this.coinId = value['id']
    });

    this.getCoinData();
    this.getGraphData();
  }

  getCoinData(){
    this.api.getCurrencyById(this.coinId)
    .subscribe( response => {
      this.coinData = response;
      console.log(this.coinData);
      
    })
  }

  getGraphData(){
    this.api.getGraphicalCurrencyData(this.coinId, "EUR", 1)
    .subscribe( response =>{
      setTimeout(()=>{this.myLineChart.chart?.update();}, 200);
      this.lineChartData.datasets[0].data = response.prices.map(( a: any) =>{
        return a[1];
      })
      this.lineChartData.labels = response.prices.map((a:any) =>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours() - 12}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleTimeString();
      })
    })

  }

}
