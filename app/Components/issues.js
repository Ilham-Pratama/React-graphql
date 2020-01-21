import React from 'react';
import Issue from './issue';

const Issues = ({
  issues: {
    edges: issues,
    pageInfo: { hasNextPage }
  },
  fetchMoreIssues
}) => {
  return (
    <div>
      <ul style={{ textAlign: 'left' }}>
        {issues.map(issue => (
          <Issue issue={issue} key={issue.node.id} />
        ))}
      </ul>
      {hasNextPage && (
        <button type="button" onClick={() => fetchMoreIssues()}>
          Fetch More
        </button>
      )}
    </div>
  );
};

export default Issues;
