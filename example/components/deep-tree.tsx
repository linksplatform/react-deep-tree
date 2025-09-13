import React, { useState } from 'react';
import DeepTree, { DataNode, useTreeNavigation } from '../../index';

// Example data demonstrating infinite depth tree structure
const exampleData: DataNode[] = [
  {
    content: 'Root Item 1: Documents',
    children: [
      {
        content: 'Work Documents',
        children: [
          {
            content: 'Project Alpha',
            children: [
              { content: 'Requirements.pdf' },
              { content: 'Design.sketch' },
              { content: 'Implementation',
                children: [
                  { content: 'Frontend Code' },
                  { content: 'Backend Code' },
                  { content: 'Database Schema' }
                ]
              }
            ]
          },
          { content: 'Project Beta.docx' },
          { content: 'Meeting Notes.md' }
        ]
      },
      {
        content: 'Personal Files',
        children: [
          { content: 'Photos',
            children: [
              { content: 'Vacation 2023' },
              { content: 'Family Events' }
            ]
          },
          { content: 'Books',
            children: [
              { content: 'Technical',
                children: [
                  { content: 'React Patterns.epub' },
                  { content: 'TypeScript Deep Dive.pdf' }
                ]
              },
              { content: 'Fiction',
                children: [
                  { content: 'Sci-Fi Collection' },
                  { content: 'Mystery Novels' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    content: 'Root Item 2: Development',
    children: [
      {
        content: 'Web Projects',
        children: [
          { content: 'E-commerce Site' },
          { content: 'Portfolio Website' },
          { content: 'Blog Platform',
            children: [
              { content: 'Frontend (React)' },
              { content: 'Backend (Node.js)' },
              { content: 'Database (PostgreSQL)' }
            ]
          }
        ]
      },
      {
        content: 'Mobile Apps',
        children: [
          { content: 'iOS App' },
          { content: 'Android App' },
          { content: 'React Native Project' }
        ]
      }
    ]
  },
  {
    content: 'Root Item 3: Learning Resources',
    children: [
      {
        content: 'Online Courses',
        children: [
          { content: 'JavaScript Fundamentals' },
          { content: 'Advanced React Patterns' },
          { content: 'System Design' }
        ]
      },
      { content: 'Video Tutorials' },
      { content: 'Documentation Links' }
    ]
  }
];

export function BasicDeepTreeExample() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Basic Deep Tree (Static)</h2>
      <DeepTree data={exampleData} />
    </div>
  );
}

export function NavigationEnabledExample() {
  const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '300px',
        height: '100vh',
        backgroundColor: '#2A2A2A',
        color: '#fff',
        padding: '20px',
        overflow: 'auto',
        zIndex: 500
      }}>
        <h3>Navigation Controls</h3>
        <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li>↑/↓ Arrow Keys: Navigate items</li>
          <li>Mouse Wheel: Navigate items</li>
          <li>/ : Toggle search</li>
          <li>ESC: Close search</li>
        </ul>
        
        <h4>Selected Item:</h4>
        <div style={{
          backgroundColor: '#1F1F1F',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {selectedNode ? selectedNode.content : 'None selected'}
        </div>
      </div>

      <div style={{ marginRight: '320px' }}>
        <DeepTree
          data={exampleData}
          enableNavigation={true}
          enableSearch={false}
          onNodeSelect={(node) => setSelectedNode(node)}
        />
      </div>
    </div>
  );
}

export function SearchEnabledExample() {
  return (
    <div>
      <h2 style={{ 
        color: '#fff', 
        textAlign: 'center', 
        marginBottom: '20px',
        backgroundColor: '#2A2A2A',
        padding: '20px'
      }}>
        Search-Enabled Deep Tree
      </h2>
      <p style={{ 
        color: '#959595', 
        textAlign: 'center', 
        marginBottom: '40px' 
      }}>
        Press "/" to search, or use the search box above
      </p>
      
      <DeepTree
        data={exampleData}
        enableNavigation={true}
        enableSearch={true}
        onNodeSelect={(node) => console.log('Selected:', node.content)}
      />
    </div>
  );
}

// Demo of customizable components
export function CustomStyledExample() {
  const CustomListItem = ({ children, ...props }: any) => (
    <div style={{
      borderLeft: '2px solid #EA7500',
      paddingLeft: '10px',
      margin: '5px 0'
    }} {...props}>
      {children}
    </div>
  );

  const CustomContentFrame = ({ children, ...props }: any) => (
    <span style={{
      backgroundColor: '#2A2A2A',
      padding: '5px 10px',
      borderRadius: '15px',
      display: 'inline-block'
    }} {...props}>
      {children}
    </span>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Custom Styled Components</h2>
      <DeepTree
        data={exampleData}
        ListItem={CustomListItem}
        ContentFrame={CustomContentFrame}
        enableNavigation={true}
      />
    </div>
  );
}

export default function DeepTreeDemo() {
  const [currentExample, setCurrentExample] = useState('navigation');

  const examples = {
    basic: <BasicDeepTreeExample />,
    navigation: <NavigationEnabledExample />,
    search: <SearchEnabledExample />,
    custom: <CustomStyledExample />
  };

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#2A2A2A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        zIndex: 1000
      }}>
        {Object.keys(examples).map((key) => (
          <button
            key={key}
            onClick={() => setCurrentExample(key)}
            style={{
              padding: '10px 15px',
              backgroundColor: currentExample === key ? '#EA7500' : 'transparent',
              color: '#fff',
              border: '1px solid #EA7500',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '60px' }}>
        {examples[currentExample as keyof typeof examples]}
      </div>
    </div>
  );
}