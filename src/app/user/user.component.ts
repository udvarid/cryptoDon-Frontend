import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserDto } from '../shared/dto/userDto.model';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/dto/user.model';
import { Wallet } from '../shared/dto/wallet.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {


  private user: UserDto;
  private userWatcher: Subscription;
  private fullUser: User;

  constructor(private authService: AuthService, private userService: UserService) { }

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

  ngOnDestroy(): void {
    this.userWatcher.unsubscribe();
  }

}
