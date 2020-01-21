import { Component, OnInit } from '@angular/core';
import { CryptoService } from './crypto.service';


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {

  constructor(private cryptoService: CryptoService) { }

  ngOnInit() {
  }

  public collectCryptoData() {
    this.cryptoService.collectData();
  }

  public getRecentCrptoData() {
    this.cryptoService.getBloombergData();
  }

}
