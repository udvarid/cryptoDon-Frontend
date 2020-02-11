import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { InfoComponent } from './info/info.component';
import { CryptoComponent } from './crypto/crypto.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'user', component: UserComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'crypto', component: CryptoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
