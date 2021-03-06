import React from 'react';

interface DataNode {
  readonly content: any;
  readonly children: DataNode[];
}
export type { DataNode };

export function TreeNode({ data }) {
  const { content, children } = data;
  let item;
  let treeNodesList;

  if (content !== undefined) {
    item = <div>{content}</div>;
  }
  if (children && children.length > 0) {

    const treeNodes = children.map((element, index) => <TreeNode data={element} key={index} />);
    treeNodesList = <ul>{treeNodes}</ul>;
  }
  return (
    <li>
      {item}
      {treeNodesList}
    </li>
  );
}

export function DeepTree({ data }) {
  return (
    <ul> {data.map((object, index) => <TreeNode key={index} data={object} />)} </ul>
  );
}

export default DeepTree;
