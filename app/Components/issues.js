import React from 'react';
import Issue from './issue';

const Issues = ({ issues }) => {
  return (
    <div style={{ textAlign: 'left' }}>
      <ul>
        {issues.map(issue => (
          <Issue issue={issue} key={issue.node.id} />
        ))}
      </ul>
    </div>
  );
};

export default Issues;
