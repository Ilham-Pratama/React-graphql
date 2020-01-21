import React from 'react';

const Issue = ({ issue }) => (
  <li>
    <a href={issue.node.url}>{issue.node.title}</a>
  </li>
);
export default Issue;
