import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface DataNode {
  readonly content: any;
  readonly children?: DataNode[];
}

export interface TreeNodeProps {
  data: DataNode;
  ListItem?: React.ElementType;
  List?: React.ElementType;
  ContentFrame?: React.ElementType;
  level?: number;
  isSelected?: boolean;
  onSelect?: (node: DataNode, index: number) => void;
  nodeIndex?: number;
  className?: string;
}

export interface DeepTreeProps {
  data: DataNode[];
  ListItem?: React.ElementType;
  List?: React.ElementType;
  ContentFrame?: React.ElementType;
  TreeFrame?: React.ElementType;
  enableNavigation?: boolean;
  enableSearch?: boolean;
  onNodeSelect?: (node: DataNode, index: number) => void;
  selectedIndex?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface NavigationHookProps {
  data: DataNode[];
  enableNavigation: boolean;
  onNodeSelect?: (node: DataNode, index: number) => void;
}

export interface FlatNode {
  node: DataNode;
  level: number;
  index: number;
  parent?: DataNode;
}

function flattenTree(data: DataNode[], level: number = 0): FlatNode[] {
  const result: FlatNode[] = [];
  data.forEach((node, index) => {
    result.push({ node, level, index, parent: undefined });
    if (node.children && node.children.length > 0) {
      const childNodes = flattenTree(node.children, level + 1);
      childNodes.forEach((child) => {
        child.parent = node;
        result.push(child);
      });
    }
  });
  return result;
}

export function useTreeNavigation({ data, enableNavigation, onNodeSelect }: NavigationHookProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [showQuery, setShowQuery] = useState(false);

  const flatNodes = useMemo(() => flattenTree(data), [data]);
  const filteredNodes = useMemo(() => {
    if (!query) { return flatNodes; }
    return flatNodes.filter(({ node }) =>
      node.content && node.content.toString().toLowerCase().includes(query.toLowerCase()),
    );
  }, [flatNodes, query]);

  const currentNode = filteredNodes[selectedIndex];

  const navigateUp = useCallback(() => {
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const navigateDown = useCallback(() => {
    setSelectedIndex((prev) => Math.min(filteredNodes.length - 1, prev + 1));
  }, [filteredNodes.length]);

  const toggleQuery = useCallback(() => {
    setShowQuery((prev) => !prev);
    if (showQuery) {
      setQuery('');
    }
  }, [showQuery]);

  useEffect(() => {
    if (!enableNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigateUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          navigateDown();
          break;
        case '/':
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            toggleQuery();
          }
          break;
        case 'Escape':
          if (showQuery) {
            event.preventDefault();
            setShowQuery(false);
            setQuery('');
          }
          break;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        navigateDown();
      } else {
        navigateUp();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [enableNavigation, navigateUp, navigateDown, toggleQuery, showQuery]);

  useEffect(() => {
    if (currentNode && onNodeSelect) {
      onNodeSelect(currentNode.node, currentNode.index);
    }
  }, [currentNode, onNodeSelect]);

  return {
    selectedIndex,
    setSelectedIndex,
    query,
    setQuery,
    showQuery,
    setShowQuery,
    toggleQuery,
    filteredNodes,
    currentNode
  };
}

export function TreeNode({ 
  data, 
  ListItem = 'li', 
  List = 'ul', 
  ContentFrame = 'div',
  level = 0,
  isSelected = false,
  onSelect,
  nodeIndex = 0,
  className = ''
}: TreeNodeProps) {
  const { content, children } = data;
  const nodeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected && nodeRef.current) {
      nodeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [isSelected]);

  const handleClick = useCallback(() => {
    if (onSelect) {
      onSelect(data, nodeIndex);
    }
  }, [data, nodeIndex, onSelect]);

  let item;
  let treeNodesList;

  if (content !== undefined) {
    item = (
      <ContentFrame 
        className={isSelected ? 'selected' : ''}
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          padding: '4px 8px',
          backgroundColor: isSelected ? '#EA7500' : 'transparent',
          color: isSelected ? '#fff' : 'inherit',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {content}
      </ContentFrame>
    );
  }

  if (children && children.length > 0) {
    const treeNodes = children.map((element, index) => (
      <TreeNode 
        data={element} 
        key={index}
        ListItem={ListItem} 
        List={List} 
        ContentFrame={ContentFrame}
        level={level + 1}
        isSelected={false}
        onSelect={onSelect}
        nodeIndex={index}
      />
    ));
    treeNodesList = <List style={{ marginLeft: level > 0 ? '20px' : '0' }}>{treeNodes}</List>;
  }

  return (
    <ListItem 
      ref={nodeRef as any}
      className={className}
      style={{
        listStyle: 'none',
        margin: '2px 0'
      }}
    >
      {item}
      {treeNodesList}
    </ListItem>
  );
}

export function DeepTree({ 
  data, 
  ListItem = 'li', 
  List = 'ul', 
  ContentFrame = 'div', 
  TreeFrame = 'div',
  enableNavigation = false,
  enableSearch = false,
  onNodeSelect,
  selectedIndex,
  className = '',
  style = {}
}: DeepTreeProps) {
  const navigation = useTreeNavigation({ 
    data, 
    enableNavigation, 
    onNodeSelect 
  });

  const currentSelectedIndex = selectedIndex !== undefined ? selectedIndex : navigation.selectedIndex;

  const defaultStyle: React.CSSProperties = {
    fontFamily: 'Verdana, sans-serif, Calibri',
    fontSize: '15px',
    lineHeight: '1.5em',
    backgroundColor: '#1F1F1F',
    color: '#959595',
    padding: '20px',
    minHeight: '100vh',
    ...style
  };

  return (
    <TreeFrame className={className} style={defaultStyle}>
      {(enableSearch || navigation.showQuery) && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          right: '20px',
          zIndex: 1000
        }}>
          <input
            type="text"
            value={navigation.query}
            onChange={(e) => navigation.setQuery(e.target.value)}
            placeholder="Search..."
            autoComplete="off"
            spellCheck={false}
            style={{
              width: '100%',
              padding: '10px 15px',
              backgroundColor: '#2A2A2A',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              outline: 'none'
            }}
            autoFocus
          />
        </div>
      )}
      
      <div style={{ marginTop: navigation.showQuery ? '80px' : '0' }}>
        <List style={{ padding: 0, margin: 0 }}>
          {navigation.query ? 
            navigation.filteredNodes.map((item, index) => {
              const isSelected = enableNavigation && index === currentSelectedIndex;
              return (
                <TreeNode 
                  key={index}
                  data={item.node}
                  ListItem={ListItem} 
                  List={List} 
                  ContentFrame={ContentFrame}
                  isSelected={isSelected}
                  onSelect={navigation.currentNode ? 
                    (node, nodeIndex) => onNodeSelect?.(node, nodeIndex) : 
                    undefined
                  }
                  nodeIndex={index}
                />
              );
            }) :
            data.map((item, index) => {
              const isSelected = enableNavigation && index === currentSelectedIndex;
              return (
                <TreeNode 
                  key={index}
                  data={item}
                  ListItem={ListItem} 
                  List={List} 
                  ContentFrame={ContentFrame}
                  isSelected={isSelected}
                  onSelect={navigation.currentNode ? 
                    (node, nodeIndex) => onNodeSelect?.(node, nodeIndex) : 
                    undefined
                  }
                  nodeIndex={index}
                />
              );
            })
          }
        </List>
      </div>
    </TreeFrame>
  );
}

export default DeepTree;
