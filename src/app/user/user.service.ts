import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { User } from '../shared/dto/user.model';

const userQuery = gql
`query userQuery($id: Int){
    user(id:$id) {
        id,
        fullname,
        wallets {
            ccy,
            amount
        }
    }
}`;
@Injectable({ providedIn: 'root' })

export class UserService  {

    pre: string;
    user = new Subject<User>();

    constructor(private apollo: Apollo) {
    this.pre = environment.apiUrl;
}

    userQuerySubscription = new Subscription();

    getUserData(idOfUser: number) {
        this.unsubscribe();
        this.userQuerySubscription = this.apollo.watchQuery({
                                query: userQuery,
                                variables: { id: idOfUser}
                                })
            .valueChanges
            .pipe(map(result => result.data['user']))
            .subscribe(result => {
                this.user.next(result);
            });
    }

    unsubscribe() {
        this.userQuerySubscription.unsubscribe();
    }

}
