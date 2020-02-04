import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from 'src/app/crypto/crypto.service';
import { Candle } from '../dto/candle.model';
import { deflateRaw, deflateRawSync } from 'zlib';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-candle-chart',
  templateUrl: './candle-chart.component.html',
  styleUrls: ['./candle-chart.component.css']
})
export class CandleChartComponent implements OnInit, OnDestroy {

  private historyWatcher: Subscription;
  private candleHistory: Candle[];

  chartStep: number;
  chartStepMultiplier: number;

  view: any[];
  multi = [];

  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  yAxisLabel = 'Price';
  timeline = true;
  maxValueY = 0;
  minValueY = 0;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.chartStep = 100;
    this.chartStepMultiplier = window.innerWidth > 1600 ? 3 : 2;
    this.view = [this.chartStep * this.chartStepMultiplier * 5, this.chartStep * this.chartStepMultiplier * 2];
    this.historyWatcher = this.cryptoService.newHistoryCandles
              .subscribe((result: Candle[]) => {
                this.candleHistory = result;
                this.draw(this.candleHistory);
              }) ;
  }
  ngOnDestroy(): void {
    this.historyWatcher.unsubscribe();
  }

  draw(candles: Candle[]) {
    const candleTypes = [
      {name : 'High',
       column : 'high'},
       {name : 'Close',
       column : 'close'},
       {name : 'Low',
       column : 'low'}
    ];
    this.multi = [];

    candleTypes.forEach( ct => {
      const transformedData = {
        name: ct.name,
        series: []
      };
      candles.forEach( candle => {
        const onePoint = {
          name: candle.time.substr(candle.time.length - 11).replace('T', ' '),
          value: candle[ct.column]
        };
        transformedData.series.push(onePoint);
      });
      this.multi.push(transformedData);
    });

    this.calculateMinMax();
  }

  calculateMinMax() {
    let minCandle = 1000000000;
    let maxCandle = 0;
    this.candleHistory.forEach(candle => {
      if (candle.low < minCandle) {
        minCandle = candle.low;
      }
      if (candle.high > maxCandle) {
        maxCandle = candle.high;
      }
    });
    const band = 0.005;
    this.maxValueY = Math.ceil(maxCandle * (1 + band));
    this.minValueY = Math.ceil(minCandle * (1 - band)) - 1;
  }


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
