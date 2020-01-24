import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { InfoComponent } from './info/info.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './shared/dropdown.directives';
import { AuthService } from './auth/auth.service';
import { ModalComponent } from './shared/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHttpInterceptor } from './shared/interceptor/http.interceptor';
import { MaterialsModule } from './shared/materials.module';
import { CryptoComponent } from './crypto/crypto.component';
import { XhrInterceptor } from './shared/interceptor/http_xhr.interceptor';
import { HttpRequestInterceptor } from './shared/interceptor/http_credential.interceptor';
import { GraphQLModule } from './graphQL.module';
import { CandleChartComponent } from './shared/candle-chart/candle-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    DropdownDirective,
    InfoComponent,
    LoadingSpinnerComponent,
    ModalComponent,
    CryptoComponent,
    CandleChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialsModule,
    GraphQLModule,
    NgxChartsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [AuthService,
             { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
             { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
             { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
