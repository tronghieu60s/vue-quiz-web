import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

/* Config apolloClient */
const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({ link: httpLink, cache });

export const onError = (err) => {
  console.log(
    "Error connecting system to server. Please reload and try again."
  );
  if (process.env.NODE_ENV !== "development") return;

  console.error(err.networkError);
  // graphql error
  const error = err.networkError.result.errors[0];
  const location = error.locations[0];
  console.error(
    `GraphQLError: ${error.message} on ${location.line} - ${location.column}`
  );
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
