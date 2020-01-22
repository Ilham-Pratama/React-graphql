import React, { useRef, useEffect, useReducer } from 'react';
import {
  axiosGithubGraphQL,
  getOrganizationAndRepository,
  repositoryStarMutation
} from './configs';
import Organization from './Components/organization';

export const actionTypes = {
  SET_DATA: 'SET_DATA',
  SET_REPO_MUTATION: 'SET_REPO_MUTATION',
  SET_ORG_PATH: 'SET_ORGANIZATION_PATH',
  SET_REPO_PATH: 'SET_REPO_PATH'
};

const dataReducer = (state, action) => {
  if (action.type === actionTypes.SET_DATA) {
    return {
      ...state,
      organization: action.payload.organization,
      errors: action.payload.errors || state.errors
    };
  }
  if (action.type === actionTypes.SET_ORG_PATH) {
    return {
      ...state,
      path: `${action.payload}${state.path.split('/')[1]}`
    };
  }
  if (action.type === actionTypes.SET_REPO_PATH) {
    return {
      ...state,
      path: `${state.path.split('/')[0]}/${action.payload}`
    };
  }
  return state;
};

const initialData = {
  path: 'facebook/create-react-app',
  organization: null,
  errors: null
};

const getIssuesQuery = (organization, repository, endCursor) =>
  axiosGithubGraphQL.post('', {
    query: getOrganizationAndRepository,
    variables: { organization, repository, endCursor }
  });

const getRepositoryStarMutationQuery = (id, hasStarred) =>
  axiosGithubGraphQL.post('', {
    query: repositoryStarMutation(hasStarred),
    variables: { id, hasStarred }
  });

const resolveRepositoryStarMutationQuery = (dispatch, organization) => {
  // const { viewerHasStarred } = res.data.data[
  //   hasStarred ? 'removeStar' : 'addStar'
  // ].starrable;
  const { viewerHasStarred } = organization.repository;
  dispatch({
    type: actionTypes.SET_DATA,
    payload: {
      organization: {
        ...organization,
        repository: {
          ...organization.repository,
          viewerHasStarred: !viewerHasStarred
        }
      }
    }
  });
};

const resolveIssuesQuery = (dispatch, res, state, cursor) => {
  if (!cursor) {
    return dispatch({
      type: actionTypes.SET_DATA,
      payload: {
        organization: res.data.data.organization,
        errors: res.data.errors
      }
    });
  }
  dispatch({
    type: actionTypes.SET_DATA,
    payload: {
      organization: {
        ...res.data.data.organization,
        repository: {
          ...res.data.data.organization.repository,
          issues: {
            ...res.data.data.organization.repository.issues,
            edges: [
              ...state.organization.repository.issues.edges,
              ...res.data.data.organization.repository.issues.edges
            ]
          }
        }
      },
      errors: res.data.errors
    }
  });
};
const App = () => {
  const [data, dispatch] = useReducer(dataReducer, initialData);
  const repoRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
  };
  const fetchFromGithub = (org, repo, cursor, currentData) => {
    getIssuesQuery(org, repo, cursor).then(res => {
      resolveIssuesQuery(dispatch, res, currentData, cursor);
    });
  };
  const fetchStarMutation = hasStarred => {
    getRepositoryStarMutationQuery(data.organization.repository.id, hasStarred);
    resolveRepositoryStarMutationQuery(dispatch, data.organization);
  };
  const fetchMoreIssues = () => {
    const { endCursor } = data.organization.repository.issues.pageInfo;
    fetchFromGithub(...data.path.split('/'), endCursor, data);
  };

  useEffect(() => {
    fetchFromGithub(...data.path.split('/'));
  }, []);

  return (
    <div style={{ textAlign: 'center', color: 'black' }}>
      <h2 style={{ fontFamily: 'Raleway-medium' }}>
        Welcome to my simple React-GraphQL App
      </h2>
      <form onSubmit={onSubmit}>
        <input
          ref={repoRef}
          id="repoForm"
          type="text"
          placeholder="Search an open Issue"
        />
        <button type="submit" onClick={() => console.log(data)}>
          Search Repo
        </button>
      </form>
      <Organization
        organization={data.organization}
        errors={data.errors}
        fetchMoreIssues={fetchMoreIssues}
        fetchStarMutation={fetchStarMutation}
      />
    </div>
  );
};

export default App;
