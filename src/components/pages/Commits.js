import React, { useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import CommitItem from '../commits/CommitItem';
import { Link, useParams } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const Commits = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { loading, getRepoCommits, commits } = githubContext;

  // get username from url
  let { login, reponame } = useParams();

  useEffect(() => {
    console.log('Username: ' + match.params.login);
    console.log('Reponame: ' + match.params.reponame);
    console.log('Repo name from UsParams: ' + reponame);
    getRepoCommits(login, reponame);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <Link to={`/user/${login}`} className='btn btn-success'>
        Return To User
      </Link>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      <h1>List of Latest Commits: {`${commits.length} total (100 max)`}</h1>
      <h3>User Name: {login}</h3>
      <h3>Repo Name: {reponame}</h3>

      {commits.map(commit => (
        <CommitItem commit={commit} key={commit.id} />
      ))}
    </div>
  );
};

export default Commits;
