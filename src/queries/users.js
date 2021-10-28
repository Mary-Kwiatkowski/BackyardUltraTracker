const githubQuery = (pageCount, queryString) => {
  return {
    query: `
        {
            viewer {
              name
            }
            search(query: "topic:${queryString} sort:updated-desc", type: REPOSITORY, first: ${pageCount}) {
                repositoryCount
                nodes {
                ... on Repository {
                  name
                  description
                  id
                  url
                  stargazerCount
                }
              }
            }
          }
        `,
  };
};

//user:Mary-Kwiatkowski

export { githubQuery };
