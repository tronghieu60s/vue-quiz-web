import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

/* Config apolloClient */
const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({ link: httpLink, cache });

export const executeQuery = (query, variables = {}) => {
  return apolloClient
    .query({ query, variables })
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

export const executeMutation = (mutation, variables = {}) => {
  return apolloClient
    .mutate({ mutation, variables })
    .then((res) => res.data)
    .catch((err) => console.error(err));
};
