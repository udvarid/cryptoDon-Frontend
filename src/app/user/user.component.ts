import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserDto } from '../shared/dto/userDto.model';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/dto/user.model';
import { Wallet } from '../shared/dto/wallet.model';
import { CryptoService } from '../crypto/crypto.service';
import { Candle } from '../shared/dto/candle.model';
import { callbackify } from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {


  private user: UserDto;
  private userWatcher: Subscription;
  private bloombergWatcher: Subscription;
  private bloombergCandle: Candle[];
  private fullUser: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private cryptoService: CryptoService) {
                this.bloombergWatcher = this.cryptoService.newBloombergCandles.subscribe(candle => {
                  this.bloombergCandle = candle;
                });
                this.callBloomberg();
               }

  ngOnInit() {
    this.user = this.authService.userNameDto;
    this.userWatcher = this.userService.user.subscribe((result: User) => {
      this.fullUser = result;
      const usdWallet = this.fullUser.wallets.filter(wallet => wallet.ccy === 'USD');
      const otherWallet = this.fullUser.wallets.filter(wallet => wallet.ccy !== 'USD');
      this.fullUser.wallets = usdWallet.concat(otherWallet);
    });
    this.userService.getUserData(this.user.id);
  }

  async callBloomberg() {
    await this.cryptoService.getBloombergData();
  }

  ngOnDestroy(): void {
    this.userWatcher.unsubscribe();
    this.bloombergWatcher.unsubscribe();
  }

  valueOfCcy(ccy: string): number {
    const candle: Candle = this.bloombergCandle.find(c => c.currencyPair.substr(0, ccy.length) === ccy);
    return candle ? candle.close : 0;
  }

}
