import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators';
import { Candle } from '../shared/dto/candle.model';
import { Subject, Subscription, ObjectUnsubscribedError } from 'rxjs';

const bloombergQuery = gql
`query bloombergQuery{
    actualCandles {
        currencyPair,
        time,
        close,
        open
    }
}`;

const cryptoHistoryQuery = gql
`query cryptoHistoryQuery($currencyPair: String, $lastNumberOfCandles: Int, $periodLength: Int){
    candleHistory(currencyPair:$currencyPair, lastNumberOfCandles: $lastNumberOfCandles, periodLength: $periodLength) {
        currencyPair,
        time,
        close,
        open,
        high,
        low,
        vwap,
        volume
    }
}`;

@Injectable({ providedIn: 'root' })

export class CryptoService {

    pre: string;
    bloombergCandles: Candle[];
    candleHistory: Candle[];
    newBloombergCandles = new Subject<Candle[]>();
    newHistoryCandles = new Subject<Candle[]>();
    bloombergQuerySubscription = new Subscription();
    historyQuerySubscription = new Subscription();

    constructor(private http: HttpClient, private router: Router,
                private toastrService: ToastrService, private apollo: Apollo) {
        this.pre = environment.apiUrl;
    }

    collectData() {
        const header = new HttpHeaders({});
        this.http.get(this.pre + '/api/exchange/getCandle', {headers: header}).toPromise().then();
    }

    getBloombergData() {
        this.unsubscribe();
        this.bloombergQuerySubscription = this.apollo.watchQuery({query: bloombergQuery})
            .valueChanges
            .pipe(map(result => result.data['actualCandles']))
            .subscribe(result => {
                this.bloombergCandles = result;
                this.newBloombergCandles.next(result);
            });
    }

    getCryptoHistoryData(cryptoPair: string, numberOfCandles: number, period: number) {
        this.unsubscribe();
        this.historyQuerySubscription = this.apollo.watchQuery({
                                query: cryptoHistoryQuery,
                                variables: { currencyPair: cryptoPair,
                                             lastNumberOfCandles: numberOfCandles,
                                             periodLength: period }
                                })
            .valueChanges
            .pipe(map(result => result.data['candleHistory']))
            .subscribe(result => {
                this.candleHistory = result;
                this.newHistoryCandles.next(result);
            });
    }

    unsubscribe() {
        this.bloombergQuerySubscription.unsubscribe();
        this.historyQuerySubscription.unsubscribe();
    }
}
