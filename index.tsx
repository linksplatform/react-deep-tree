import React from 'react';

function TreeNode(props) {
  const content = props.data.content;
  const children = props.data.children;
  let item;
  let treeNodesList;
  if (content !== undefined) {
    item = <div>{content}</div>;
  }
  if (children && children.length > 0) {
    const treeNodes = children.map(child => <TreeNode data={child} />);
    treeNodesList = <ul>{treeNodes}</ul>;
  }
  return (
    <li>
      {item}
      {treeNodesList}
    </li>
  );
}

export function DeepTree(props) {
  return (
    <ul>
      <TreeNode data={props.data} />
    </ul>
  );
}

export default DeepTree;
