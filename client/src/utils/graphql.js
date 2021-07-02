import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { E_SERVER_ERROR_CONNECTING } from "@common/string";

const SERVER = process.env.VUE_APP_SERVER_URL || "http://localhost:4000";

/* Config apolloClient */
const httpLink = createHttpLink({ uri: `${SERVER}/graphql` });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { fetchPolicy: "no-cache", errorPolicy: "all" },
    watchQuery: { fetchPolicy: "no-cache", errorPolicy: "ignore" },
  },
});

export const onError = (err) => {
  console.log(E_SERVER_ERROR_CONNECTING);
  if (process.env.NODE_ENV !== "development") return;

  // server error
  console.error(`Server${err}`);
  // graphql error
  if (!err.networkError) return;
  const error = err.networkError.result.errors[0];
  console.error(`GraphQLError: ${error.message}`);
};

export const executeQuery = (query, variables = {}) => {
  return apolloClient
    .query({ query, variables })
    .then((res) => res.data)
    .catch((err) => onError(err));
};

export const executeMutation = (mutation, variables = {}) => {
  return apolloClient
    .mutate({ mutation, variables })
    .then((res) => res.data)
    .catch((err) => onError(err));
};
