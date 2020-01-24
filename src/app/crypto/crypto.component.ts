import { Component, OnInit } from '@angular/core';
import { CryptoService } from './crypto.service';
import { Candle } from '../shared/dto/candle.model';


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {

  bloombergCandles: Candle[];
  candleHistory: Candle[];

  constructor(private cryptoService: CryptoService) { }

  ngOnInit() {
  }

  public collectCryptoData() {
    this.cryptoService.collectData();
  }

  getRecentCrptoData() {
    this.cryptoService.getBloombergData().subscribe(result => {
      this.bloombergCandles = result;
      console.log(this.bloombergCandles);
    });
  }

  getCryptoHistoryData(cryptoPair: string) {
    this.cryptoService.getCryptoHistoryData(cryptoPair, 96).subscribe(result => {
      this.candleHistory = result;
      console.log(this.candleHistory);
    });
  }

}
