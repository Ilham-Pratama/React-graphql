import axios from 'axios';

export const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`
  }
});

export const getOrganizationAndRepository = `
    query($organization: String!, $repository: String!, $endCursor: String){
      organization(login: $organization) {
        name
        url 
        repository(name: $repository){
          name
          url
          issues(first: 5, states: [OPEN], after: $endCursor){
            edges{
              node{
                id
                title
                url
                reactions(last: 3){
                  edges{
                    node{
                      id
                      content
                    }
                  }
                }
              }
            }
            totalCount
            pageInfo{
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  `;
