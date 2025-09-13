import React, { useState } from 'react';
import DeepTree, { DataNode } from '../index';

const customData: DataNode[] = [
  {
    id: 'user1',
    content: 'John Doe',
    children: [
      {
        id: 'project1',
        content: 'Web Dashboard',
        children: [
          {
            id: 'task1',
            content: 'Login System',
            children: []
          },
          {
            id: 'task2', 
            content: 'User Profile',
            children: []
          }
        ]
      }
    ],
    metadata: {
      type: 'user',
      email: 'john@example.com',
      avatar: '👤'
    }
  },
  {
    id: 'user2',
    content: 'Jane Smith',
    children: [
      {
        id: 'project2',
        content: 'Mobile App',
        children: [
          {
            id: 'task3',
            content: 'Authentication',
            children: []
          }
        ]
      }
    ],
    metadata: {
      type: 'user',
      email: 'jane@example.com',
      avatar: '👩'
    }
  }
];

export const CustomRenderingExample: React.FC = () => {
  const [clickedNode, setClickedNode] = useState<DataNode | null>(null);

  const customRenderNode = (node: DataNode, isLeaf: boolean) => {
    const { metadata } = node;
    
    if (metadata?.type === 'user') {
      return (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '4px 8px',
          background: '#e3f2fd',
          borderRadius: '4px',
          border: '1px solid #2196f3'
        }}>
          <span style={{ marginRight: '8px' }}>{metadata.avatar}</span>
          <div>
            <div style={{ fontWeight: 'bold' }}>{node.content}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{metadata.email}</div>
          </div>
        </div>
      );
    }
    
    if (node.id?.toString().startsWith('project')) {
      return (
        <div style={{ 
          padding: '4px 8px',
          background: '#f3e5f5',
          borderRadius: '4px',
          border: '1px solid #9c27b0'
        }}>
          📁 <strong>{node.content}</strong>
        </div>
      );
    }
    
    if (node.id?.toString().startsWith('task')) {
      return (
        <div style={{ 
          padding: '2px 6px',
          background: '#e8f5e8',
          borderRadius: '3px',
          border: '1px solid #4caf50'
        }}>
          ✅ {node.content}
        </div>
      );
    }
    
    return <span>{node.content}</span>;
  };

  const handleNodeClick = (node: DataNode) => {
    setClickedNode(node);
  };

  return (
    <div>
      <h2>Custom Node Rendering Example</h2>
      
      <DeepTree 
        data={customData}
        renderNode={customRenderNode}
        onNodeClick={handleNodeClick}
      />

      {clickedNode && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f0f0f0',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}>
          <h4>Clicked Node Details:</h4>
          <pre>{JSON.stringify(clickedNode, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CustomRenderingExample;