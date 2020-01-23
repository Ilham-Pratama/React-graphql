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
          id
          viewerHasStarred
          name
          url
          stargazers{
            totalCount
          }
          issues(first: 5, states: [OPEN], after: $endCursor){
            edges{
              node{
                id
                title
                url
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

export const repositoryStarMutation = hasStarred => {
  const query = !hasStarred
    ? `addStar (input: {starrableId: $id}){
      starrable{
        viewerHasStarred
      }
    }`
    : `removeStar (input: {starrableId: $id}){
      starrable{
        viewerHasStarred
      }
    }`;
  return `mutation($id: ID! ){
    ${query}
  }`;
};
