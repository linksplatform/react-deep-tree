import React, { useState } from 'react';
import { DataNode, treeUtils } from '../index';

const utilsData: DataNode[] = [
  {
    id: 'root1',
    content: 'Application',
    children: [
      {
        id: 'frontend',
        content: 'Frontend',
        children: [
          {
            id: 'components',
            content: 'Components',
            children: [
              {
                id: 'button',
                content: 'Button.tsx',
                children: []
              },
              {
                id: 'modal',
                content: 'Modal.tsx', 
                children: []
              }
            ]
          },
          {
            id: 'pages',
            content: 'Pages',
            children: [
              {
                id: 'home',
                content: 'Home.tsx',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 'backend',
        content: 'Backend',
        children: [
          {
            id: 'api',
            content: 'API',
            children: [
              {
                id: 'users',
                content: 'users.js',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

export const UtilityFunctionsExample: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [searchResult, setSearchResult] = useState<DataNode | null>(null);
  const [nodePath, setNodePath] = useState<number[] | null>(null);

  const handleFindNode = () => {
    if (selectedNodeId) {
      const found = treeUtils.findNode(utilsData, selectedNodeId);
      const path = treeUtils.findNodePath(utilsData, selectedNodeId);
      setSearchResult(found);
      setNodePath(path);
    }
  };

  const flattenedTree = treeUtils.flattenTree(utilsData);
  const filteredNodes = treeUtils.filterNodes(utilsData, node => 
    String(node.content).toLowerCase().includes('.tsx')
  );

  return (
    <div>
      <h2>Utility Functions Example</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Tree Statistics</h3>
        <ul>
          <li>Total nodes: {treeUtils.countNodes(utilsData)}</li>
          <li>Maximum depth: {treeUtils.getMaxDepth(utilsData)}</li>
          <li>TypeScript files: {filteredNodes.length}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Find Node by ID</h3>
        <input
          type="text"
          placeholder="Enter node ID (e.g., 'button', 'api')"
          value={selectedNodeId}
          onChange={(e) => setSelectedNodeId(e.target.value)}
          style={{ 
            padding: '8px', 
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={handleFindNode}
          style={{
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Find Node
        </button>
        
        {searchResult && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e8' }}>
            <strong>Found:</strong> {searchResult.content}
            <br />
            <strong>Path:</strong> [{nodePath?.join(' → ') || 'N/A'}]
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Flattened Tree Structure</h3>
        <div style={{ 
          maxHeight: '200px', 
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '10px',
          background: '#f9f9f9'
        }}>
          {flattenedTree.map(({ node, depth, path }, index) => (
            <div key={index} style={{ marginLeft: `${depth * 20}px`, padding: '2px 0' }}>
              <span style={{ color: '#666' }}>
                [{path.join('.')}] 
              </span>
              {node.content}
              <span style={{ color: '#999', fontSize: '12px' }}>
                {' '}(depth: {depth})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Filtered Nodes (TypeScript files)</h3>
        <ul>
          {filteredNodes.map((node, index) => (
            <li key={index}>
              {node.content} (ID: {node.id})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UtilityFunctionsExample;