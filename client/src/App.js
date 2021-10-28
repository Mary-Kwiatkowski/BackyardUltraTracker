import github from './db.js';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link.error';
import { useEffect, useState, useCallback } from 'react';
import { githubQuery } from './graphql/queries/index';
import { AllRunners, RepoInfo, SearchBox } from './components/index';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:6969/graphql' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  let [userName, setUserName] = useState('');
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState('harry potter');
  let [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(
      githubQuery(pageCount, queryString),
    );

    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
        console.log('our data', data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageCount, queryString]);

  useEffect(() => {
    //only loads data once
    fetchData();
  }, [fetchData]);

  return (
    <ApolloProvider client={client}>
      <AllRunners />
      <div className="App container mt-5">
        <h1 className="text-primary">
          <i className="bi bi-diagram-2-fill"></i>Repos
        </h1>
        <p>Hey there {userName}</p>
        <SearchBox
          totalCount={totalCount}
          pageCount={pageCount}
          queryString={queryString}
          onQueryChange={(myString) => {
            setQueryString(myString);
          }}
          onTotalChange={(myNumber) => {
            setPageCount(myNumber);
          }}
        />
        {repoList && (
          <ul className="list-group list-group-flush">
            {repoList.map((repo) => (
              <RepoInfo key={repo.id} repo={repo} />
            ))}
          </ul>
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
