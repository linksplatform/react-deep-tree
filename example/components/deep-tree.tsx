import React from 'react';

interface DataNode {
  readonly content: any;
  readonly children: DataNode[];
}
export type { DataNode };

interface TreeNodeProps {
  data: DataNode;
  ListItem?: React.ElementType;
  List?: React.ElementType;
  ContentFrame?: React.ElementType;
}

export function TreeNode({ data, ListItem = 'li', List = 'ul', ContentFrame = 'div' }: TreeNodeProps) {
  const { content, children } = data;
  let item;
  let treeNodesList;

  if (content !== undefined) {
    item = <ContentFrame>{content}</ContentFrame>;
  }
  if (children && children.length > 0) {
    const treeNodes = children.map((element, index) => (
      <TreeNode data={element} key={index} ListItem={ListItem} List={List} ContentFrame={ContentFrame} />
    ));
    treeNodesList = <List>{treeNodes}</List>;
  }
  return (
    <ListItem>
      {item}
      {treeNodesList}
    </ListItem>
  );
}

interface DeepTreeProps {
  data: DataNode[];
  ListItem?: React.ElementType;
  List?: React.ElementType;
  ContentFrame?: React.ElementType;
  TreeFrame?: React.ElementType;
}

export function DeepTree({ data, ListItem = 'li', List = 'ul', ContentFrame = 'div', TreeFrame='div' }: DeepTreeProps) {
  return (
    <TreeFrame>
      <List>
        {data.map((object, index) => (
          <TreeNode key={index} data={object} ListItem={ListItem} List={List} ContentFrame={ContentFrame} />
        ))}
      </List>
    </TreeFrame>
  );
}

export default DeepTree;