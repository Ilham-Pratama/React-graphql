import React from 'react';

const Organization = ({ organization, errors }) => {
  return (
    <div style={{ fontFamily: 'Raleway-light' }}>
      {organization ? (
        <p>
          Issues from Organization <br />
          <a href={organization.url}>{organization.name}</a>
        </p>
      ) : (
        <React.Fragment>
          <h3>An Error Occured</h3>
          {errors.map(error => error.message).join(' ')}
        </React.Fragment>
      )}
    </div>
  );
};

export default Organization;
