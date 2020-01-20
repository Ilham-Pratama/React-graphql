import React, { useRef, useEffect, useReducer } from 'react';
import { axiosGithubGraphQL, GET_ORGANIZATION } from './configs';
import Organization from './Components/organization';

export const actionTypes = {
  SET: 'SET_DATA'
};

const dataReducer = (state, action) => {
  if (action.type === actionTypes.SET) {
    return {
      ...state,
      organization: action.payload.organization,
      errors: action.payload.errors
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
    axiosGithubGraphQL.post('', { query: GET_ORGANIZATION }).then(res => {
      dispatch({
        type: actionTypes.SET,
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
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'Raleway-extraLight' }}>
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
      {data.organization || data.errors ? (
        <Organization organization={data.organization} errors={data.errors} />
      ) : (
        <p>Please wait!</p>
      )}
    </div>
  );
};

export default App;
