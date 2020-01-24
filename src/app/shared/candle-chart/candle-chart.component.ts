import { Component, OnInit, OnDestroy } from '@angular/core';
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

  view: any[] = [1500, 600];
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
    this.historyWatcher = this.cryptoService.newHistoryCandles
              .subscribe((result: Candle[]) => {
                this.candleHistory = result.reverse();
                this.draw(this.candleHistory);
              }) ;
  }
  ngOnDestroy(): void {
    this.historyWatcher.unsubscribe();
  }

  draw(candles: Candle[]) {
    this.multi = [];
    const transformedData = {
      name: 'Open',
      series: []
    };
    candles.forEach( candle => {
      const onePoint = {
        name: candle.time.substr(candle.time.length - 5),
        value: candle.open
      };
      transformedData.series.push(onePoint);
    });
    this.multi.push(transformedData);

    const transformedData2 = {
      name: 'Close',
      series: []
    };
    candles.forEach( candle => {
      const onePoint = {
        name: candle.time.substr(candle.time.length - 5),
        value: candle.close
      };
      transformedData2.series.push(onePoint);
    });
    this.multi.push(transformedData2);

    this.calculateMinMax();
  }

  calculateMinMax() {
    let maxCandle = 1000000000;
    let minCandle = 0;
    this.candleHistory.forEach(candle => {
      if (Math.min(candle.open, candle.close) > minCandle) {
        minCandle = Math.min(candle.open, candle.close);
      }
      if (Math.max(candle.open, candle.close) < maxCandle) {
        maxCandle = Math.max(candle.open, candle.close);
      }
    });
    this.maxValueY = maxCandle * 1.1;
    this.minValueY = minCandle * 0.9;
    console.log(maxCandle);
    console.log(minCandle);
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
