// initial state and actions go here

import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  GET_COMMITS
} from '../types';

let gethubClientId;
let gethubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  gethubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  gethubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  gethubClientId = process.env.GITHUB_CLIENT_ID;
  gethubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// create initial state
const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    commits: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${gethubClientId}&client_secret=${gethubClientSecret}`
    );

    // setUsers(res.data.items); <- replaced with dispatch below
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // Get Single Github user
  const getUser = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${gethubClientId}&client_secret=${gethubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // Get users repos
  const getUserRepos = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&page=1&client_id=${gethubClientId}&client_secret=${gethubClientSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Get additional user repos
  const getMoreUserRepos = async (username, pagenum) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${pagenum}&client_id=${gethubClientId}&client_secret=${gethubClientSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Get commits for specific repo
  const getRepoCommits = async (username, reponame) => {
    setLoading();

    // Max 100 results allowed per page, need to add page=# for additional pages
    const res = await axios.get(
      `https://api.github.com/repos/${username}/${reponame}/commits?per_page=100&client_id=${gethubClientId}&client_secret=${gethubClientSecret}`
    );

    dispatch({
      type: GET_COMMITS,
      payload: res.data
    });
  };

  // Clear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        commits: state.commits,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        getMoreUserRepos,
        getRepoCommits
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
