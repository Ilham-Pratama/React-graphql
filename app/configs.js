import axios from 'axios';

export const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`
  }
});

export const getOrganizationAndRepository = (organization, repository) =>
  `
    {
      organization(login: "${organization}") {
        name
        url 
        repository(name: "${repository}"){
          name
          url
          issues(last: 5){
            edges{
              node{
                id
                title
                url
              }
            }
          }
        }
      }
    }
  `;
