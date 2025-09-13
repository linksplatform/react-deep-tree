import React from 'react';
import DeepTree, { DataNode, treeUtils } from '../index';

// Basic usage example
const basicData: DataNode[] = [
  {
    id: '1',
    content: 'Root Item 1',
    children: [
      {
        id: '1-1',
        content: 'Child 1.1',
        children: [
          {
            id: '1-1-1',
            content: 'Grandchild 1.1.1',
            children: []
          }
        ]
      },
      {
        id: '1-2',
        content: 'Child 1.2',
        children: []
      }
    ]
  },
  {
    id: '2',
    content: 'Root Item 2',
    children: [
      {
        id: '2-1',
        content: 'Child 2.1',
        children: []
      }
    ]
  }
];

export const BasicUsageExample: React.FC = () => {
  return (
    <div>
      <h2>Basic Tree Usage</h2>
      <DeepTree data={basicData} />
      
      <h3>Tree Statistics</h3>
      <ul>
        <li>Total nodes: {treeUtils.countNodes(basicData)}</li>
        <li>Max depth: {treeUtils.getMaxDepth(basicData)}</li>
      </ul>
    </div>
  );
};

export default BasicUsageExample;