import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './Style/main.css';
import axios from 'axios';

const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`
  }
});

ReactDom.render(<App />, document.getElementById('root'));
