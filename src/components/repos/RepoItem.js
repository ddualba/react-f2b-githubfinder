import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const RepoItem = ({ repo, match }) => {
  // get username from url
  let { login } = useParams();

  return (
    <div>
      <Link to={`/repos/${login}/${repo.name}`} className='btn-white'>
        <span style={{ fontSize: '.75rem', padding: '.5rem' }}> Commits </span>
      </Link>
      <span className='m-1'>
        <a href={repo.html_url}>{repo.name}</a>
      </span>
      <hr />
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
