import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = 'http://localhost:8080/api/exchange';

@NgModule({
    exports: [
      HttpClientModule,
      ApolloModule,
      HttpLinkModule
    ]
  })
  export class GraphQLModule {
    constructor(
      apollo: Apollo,
      httpLink: HttpLink
    ) {
      // create Apollo
      apollo.create({
        link: httpLink.create({ uri }),
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'network-only', // disabling cache for fetch
            errorPolicy: 'ignore',
          },
        },
      });
    }
  }
