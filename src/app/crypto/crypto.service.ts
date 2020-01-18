import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })

export class CryptoService {

    pre: string;

    constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) {
        this.pre = environment.apiUrl;
    }

    public collectData() {
        const header = new HttpHeaders({});
        this.http.get(this.pre + '/api/exchange/getCandle', {headers: header}).toPromise().then();

    }

}
