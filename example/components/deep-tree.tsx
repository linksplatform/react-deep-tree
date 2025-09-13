import React, { useState } from 'react';
import DeepTree, { DataNode, treeUtils } from '../../index';

// Demo data showcasing the enhanced features
const demoData: DataNode[] = [
  {
    id: 'docs',
    content: 'Documentation',
    expanded: true,
    children: [
      {
        id: 'api-docs',
        content: 'API Documentation',
        children: [
          {
            id: 'auth-api',
            content: 'Authentication API',
            children: []
          },
          {
            id: 'user-api',
            content: 'User Management API',
            children: []
          }
        ]
      },
      {
        id: 'guides',
        content: 'User Guides',
        children: [
          {
            id: 'quick-start',
            content: 'Quick Start Guide',
            children: []
          },
          {
            id: 'advanced',
            content: 'Advanced Configuration',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 'src',
    content: 'Source Code',
    expanded: false,
    children: [
      {
        id: 'components',
        content: 'React Components',
        children: [
          {
            id: 'tree-component',
            content: 'DeepTree Component',
            children: []
          },
          {
            id: 'search-component',
            content: 'SearchBox Component',
            children: []
          }
        ]
      },
      {
        id: 'utils',
        content: 'Utility Functions',
        children: [
          {
            id: 'tree-utils',
            content: 'Tree Manipulation Utils',
            children: []
          }
        ]
      }
    ]
  }
];

export const EnhancedDeepTreeDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);

  const handleNodeClick = (node: DataNode) => {
    setSelectedNode(node);
  };

  const customRenderNode = (node: DataNode, isLeaf: boolean) => {
    const getIcon = () => {
      if (node.id === 'docs') return '📚';
      if (node.id === 'src') return '💻';
      if (node.content.includes('Component')) return '⚛️';
      if (node.content.includes('API')) return '🔗';
      if (node.content.includes('Guide')) return '📖';
      if (isLeaf) return '📄';
      return '📁';
    };

    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        padding: '2px 4px',
        borderRadius: '3px',
        background: selectedNode?.id === node.id ? '#e3f2fd' : 'transparent'
      }}>
        <span style={{ marginRight: '6px' }}>{getIcon()}</span>
        <span>{node.content}</span>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Enhanced React Deep Tree Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search in tree..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Interactive Tree</h3>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            background: '#fafafa',
            minHeight: '300px'
          }}>
            <DeepTree
              data={demoData}
              renderNode={customRenderNode}
              searchQuery={searchQuery}
              searchMethod={treeUtils.defaultSearchMethod}
              onNodeClick={handleNodeClick}
            />
          </div>
        </div>

        <div style={{ width: '250px' }}>
          <h3>Tree Statistics</h3>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            background: '#f9f9f9'
          }}>
            <p><strong>Total nodes:</strong> {treeUtils.countNodes(demoData)}</p>
            <p><strong>Max depth:</strong> {treeUtils.getMaxDepth(demoData)}</p>
            {searchQuery && (
              <p><strong>Matching nodes:</strong> {
                treeUtils.filterNodes(demoData, node => 
                  treeUtils.defaultSearchMethod(node, searchQuery)
                ).length
              }</p>
            )}
          </div>

          {selectedNode && (
            <div style={{ marginTop: '20px' }}>
              <h3>Selected Node</h3>
              <div style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '10px',
                background: '#f0f8ff',
                fontSize: '12px'
              }}>
                <p><strong>ID:</strong> {selectedNode.id}</p>
                <p><strong>Content:</strong> {selectedNode.content}</p>
                <p><strong>Children:</strong> {selectedNode.children.length}</p>
                <p><strong>Has Path:</strong> {
                  treeUtils.findNodePath(demoData, selectedNode.id!)?.join(' → ') || 'N/A'
                }</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Maintain backward compatibility
export function TreeNode({ data, ListItem = 'li', List = 'ul', ContentFrame = 'div' }: any) {
  return (
    <DeepTree 
      data={[data]} 
      ListItem={ListItem}
      List={List}
      ContentFrame={ContentFrame}
    />
  );
}

export function DeepTree_Legacy({ data, ListItem = 'li', List = 'ul', ContentFrame = 'div', TreeFrame = 'div' }: any) {
  return (
    <DeepTree 
      data={data}
      ListItem={ListItem}
      List={List}
      ContentFrame={ContentFrame}
      TreeFrame={TreeFrame}
    />
  );
}

export default EnhancedDeepTreeDemo;