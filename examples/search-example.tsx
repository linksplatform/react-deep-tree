import React, { useState } from 'react';
import DeepTree, { DataNode, treeUtils } from '../index';

const searchData: DataNode[] = [
  {
    id: 'file1',
    content: 'Documents',
    children: [
      {
        id: 'file1-1',
        content: 'Important Report.pdf',
        children: []
      },
      {
        id: 'file1-2',
        content: 'Meeting Notes.txt',
        children: []
      }
    ]
  },
  {
    id: 'file2',
    content: 'Projects',
    children: [
      {
        id: 'file2-1',
        content: 'React App',
        children: [
          {
            id: 'file2-1-1',
            content: 'src/components/Header.tsx',
            children: []
          },
          {
            id: 'file2-1-2',
            content: 'src/utils/helpers.ts',
            children: []
          }
        ]
      },
      {
        id: 'file2-2',
        content: 'Node.js API',
        children: [
          {
            id: 'file2-2-1',
            content: 'controllers/user.js',
            children: []
          }
        ]
      }
    ]
  }
];

export const SearchExample: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <h2>Search Functionality Example</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search tree nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: '8px', 
            fontSize: '14px', 
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <DeepTree 
        data={searchData}
        searchQuery={searchQuery}
        searchMethod={treeUtils.defaultSearchMethod}
      />

      {searchQuery && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
          <h4>Search Results:</h4>
          <p>Showing nodes containing: "{searchQuery}"</p>
          <p>Matching nodes: {treeUtils.filterNodes(searchData, node => 
            treeUtils.defaultSearchMethod(node, searchQuery)
          ).length}</p>
        </div>
      )}
    </div>
  );
};

export default SearchExample;