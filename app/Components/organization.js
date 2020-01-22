import React from 'react';
import Repository from './repository';
import Issues from './issues';

const Organization = ({
  organization,
  errors,
  fetchMoreIssues,
  fetchStarMutation
}) => {
  const isLoading = !organization & !errors;
  const mutationBtnOnclick = hasStarred => e => {
    setTotalCount(hasStarred ? totalCount - 1 : totalCount + 1);
    fetchStarMutation(hasStarred);
  };
  if (isLoading) {
    return <h3>Please wait...</h3>;
  }
  if (errors) {
    return (
      <div style={{ fontFamily: 'Raleway-light' }}>
        <h3>An Error Occured</h3>
        {errors.map(error => error.message).join(' ')}
      </div>
    );
  }
  const [totalCount, setTotalCount] = React.useState(
    organization.repository.stargazers.totalCount
  );
  return (
    <div style={{ fontFamily: 'Raleway-light', color: 'black' }}>
      <p>
        Issues from Organization <br />
        <a href={organization.url}>{organization.name}</a> <br />
        <Repository repository={organization.repository} /> <br />
        Starred by{' '}
        <span style={{ fontFamily: 'Raleway-bold' }}>
          {totalCount}
        </span> users <br />
        <button
          type="button"
          onClick={mutationBtnOnclick(organization.repository.viewerHasStarred)}
        >
          {organization.repository.viewerHasStarred ? 'Unstar' : 'Star'}
        </button>
      </p>
      <Issues
        issues={organization.repository.issues}
        fetchMoreIssues={fetchMoreIssues}
      />
    </div>
  );
};

export default Organization;
