import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Candle } from '../dto/candle.model';
import { CryptoService } from 'src/app/crypto/crypto.service';

@Component({
  selector: 'app-candle-bloomberg',
  templateUrl: './candle-bloomberg.component.html',
  styleUrls: ['./candle-bloomberg.component.css']
})
export class CandleBloombergComponent implements OnInit, OnDestroy {

  private bloombergWatcher: Subscription;
  private bloombergCandle: Candle[];

  constructor(private cryptoService: CryptoService) { }

  ngOnInit() {
    this.bloombergWatcher = this.cryptoService.newBloombergCandles.subscribe(candle => {
      this.bloombergCandle = candle;
    });
  }

  ngOnDestroy(): void {
    this.bloombergWatcher.unsubscribe();
  }

  getActualPrice(pair: string): number {
    return this.bloombergCandle.find(candle => candle.currencyPair === pair).close;
  }

}
