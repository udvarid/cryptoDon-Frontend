import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators';
import { Candle } from '../shared/dto/candle.model';

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
`query cryptoHistoryQuery($currencyPair: String, $lastNumberOfCandles: Int){
    candleHistory(currencyPair:$currencyPair, lastNumberOfCandles: $lastNumberOfCandles) {
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

    constructor(private http: HttpClient, private router: Router,
                private toastrService: ToastrService, private apollo: Apollo) {
        this.pre = environment.apiUrl;
    }

    collectData() {
        const header = new HttpHeaders({});
        this.http.get(this.pre + '/api/exchange/getCandle', {headers: header}).toPromise().then();
    }

    getBloombergData(): Observable<Candle[]> {
        return this.apollo.watchQuery({query: bloombergQuery})
            .valueChanges
            .pipe(map(result => result.data['actualCandles']));
    }

    getCryptoHistoryData(cryptoPair: string, numberOfCandles: number): Observable<Candle[]> {
        return this.apollo.watchQuery({
                                        query: cryptoHistoryQuery,
                                        variables: { currencyPair: cryptoPair, lastNumberOfCandles: numberOfCandles }
                                    })
            .valueChanges
            .pipe(map(result => result.data['candleHistory']));
    }
}
