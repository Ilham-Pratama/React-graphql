import React from 'react';

const Repository = ({ repository: { name, url } }) => {
  return (
    <React.Fragment>
      <span>Repository :</span> <br />
      <a href={url}>{name}</a>
    </React.Fragment>
  );
};

export default Repository;
