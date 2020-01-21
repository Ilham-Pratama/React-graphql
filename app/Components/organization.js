import React from 'react';
import Repository from './repository';
import Issues from './issues';

const Organization = ({ organization, errors }) => {
  const isLoading = !organization & !errors;
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
  return (
    <div style={{ fontFamily: 'Raleway-light', color: 'black' }}>
      <p>
        Issues from Organization <br />
        <a href={organization.url}>{organization.name}</a> <br />
        <Repository repository={organization.repository} />
      </p>
      <Issues issues={organization.repository.issues.edges} />
    </div>
  );
};

export default Organization;
