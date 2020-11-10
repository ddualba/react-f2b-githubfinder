import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const CommitItem = ({ commit }) => {
  const htmlUrl = commit.html_url;
  const tree_url = htmlUrl.replace('/commit/', '/tree/');
  const commitMsg = commit.commit.message;
  const shortMsg = commitMsg.slice(0, 75);
  const msgLong = commitMsg.length > 75;

  return (
    <div className='card tooltip' style={{ padding: '0rem 1rem' }}>
      <span className='text-small'>
        {/* <Moment format='YYYY/MM/DD'> */}
        <Moment format='YYYY/MM/DD HH:mm'>
          {commit.commit.committer.date}
        </Moment>{' '}
      </span>
      <a href={tree_url}>
        <span className='m-1'>
          {shortMsg}
          {msgLong && ' [...]'}
        </span>
        {msgLong && <span className='tooltiptext'></span>}
      </a>
    </div>
  );
};

CommitItem.propTypes = {
  commit: PropTypes.object.isRequired
};

export default CommitItem;
