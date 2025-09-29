import { inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';

export function createApollo() {
  const httpLink = inject(HttpLink);

  const http = httpLink.create({
    uri: 'https://hjddiwebzzfc5f7r7pqmqb4elq.appsync-api.us-east-1.amazonaws.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'x-api-key': 'da2-zuj5w5q2ffg65omiw6eiebjm4i',
      },
    };
  });

  return {
    link: authLink.concat(http),
    cache: new InMemoryCache(),
  };
}
