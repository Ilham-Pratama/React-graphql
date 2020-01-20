import React, { useRef, useEffect, useReducer } from 'react';
import { axiosGithubGraphQL, GET_ORGANIZATION } from './configs';

const dataReducer = (state, action) => {
  if (action.type === '') {
    return { ...state };
  }
  return state;
};

const initialData = {
  path: 'the-road-to-learn-react/the-road-to-learn-react',
  error: null
};

const App = () => {
  const state = useReducer(dataReducer, initialData);
  const repoRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
  };
  const fetchFromGithub = () => {
    axiosGithubGraphQL
      .post('', { query: GET_ORGANIZATION })
      .then(res => console.log(res));
  };

  useEffect(() => {
    fetchFromGithub();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Raleway-extraLight' }}>
        Welcome to my simple React-GraphQL App
      </h1>
      <form onSubmit={onSubmit}>
        <input
          ref={repoRef}
          id="repoForm"
          type="text"
          placeholder="Search an open Issue"
        />
        <button type="submit">Search Repo</button>
      </form>
    </div>
  );
};

export default App;
