import React, { useRef, useEffect, useReducer } from 'react';
import { axiosGithubGraphQL, getOrganizationAndRepository } from './configs';
import Organization from './Components/organization';

export const actionTypes = {
  SET_DATA: 'SET_DATA',
  SET_ORG_PATH: 'SET_ORGANIZATION_PATH',
  SET_REPO_PATH: 'SET_REPO_PATH'
};

const dataReducer = (state, action) => {
  if (action.type === actionTypes.SET_DATA) {
    return {
      ...state,
      organization: action.payload.organization,
      errors: action.payload.errors
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
  path: 'the-road-to-learn-react/the-road-to-learn-react',
  organization: null,
  errors: null
};

const App = () => {
  const [data, dispatch] = useReducer(dataReducer, initialData);
  const repoRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
  };
  const fetchFromGithub = () => {
    axiosGithubGraphQL
      .post('', {
        query: getOrganizationAndRepository(...data.path.split('/'))
      })
      .then(res => {
        dispatch({
          type: actionTypes.SET_DATA,
          payload: {
            organization: res.data.data.organization,
            errors: res.data.errors
          }
        });
      });
  };

  useEffect(() => {
    fetchFromGithub();
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
      <Organization organization={data.organization} errors={data.errors} />
    </div>
  );
};

export default App;
