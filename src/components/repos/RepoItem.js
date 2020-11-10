import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const RepoItem = ({ repo, match }) => {
  // get username from url
  let { login } = useParams();

  return (
    <div className='card' style={{ padding: '0rem 1rem' }}>
      <Link to={`/repos/${login}/${repo.name}`} className='badge badge-light'>
        Commit List
      </Link>
      <span>
        <a href={repo.html_url}>{repo.name}</a>
      </span>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
