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



const homePageQuery = gql
`{
    actualCandles {
        currencyPair,
        time,
        close
    }
}`;

@Injectable({ providedIn: 'root' })

export class CryptoService {

    pre: string;

    constructor(private http: HttpClient, private router: Router, 
                private toastrService: ToastrService, private apollo: Apollo) {
        this.pre = environment.apiUrl;
    }

    public collectData() {
        const header = new HttpHeaders({});
        this.http.get(this.pre + '/api/exchange/getCandle', {headers: header}).toPromise().then();
    }

    public getBloombergData(): Observable<Candle[]> {
            return this.apollo
                .watchQuery({query: homePageQuery})
                .valueChanges
                .pipe(map(result => result['data']['lists']));
    }

}
