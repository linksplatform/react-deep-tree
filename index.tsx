import React from 'react';

export interface DataNode {
  readonly content: any;
  readonly children: DataNode[];
  readonly id?: string | number;
  readonly expanded?: boolean;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly [key: string]: any;
}

export interface TreeNodeProps {
  data: DataNode;
  ListItem?: React.ElementType;
  List?: React.ElementType;
  ContentFrame?: React.ElementType;
  renderNode?: (node: DataNode, isLeaf: boolean) => React.ReactNode;
  searchQuery?: string;
  searchMethod?: (node: DataNode, searchQuery: string) => boolean;
  onNodeClick?: (node: DataNode) => void;
  onNodeExpand?: (node: DataNode) => void;
  onNodeCollapse?: (node: DataNode) => void;
}

export interface DeepTreeProps {
  data: DataNode[];
  ListItem?: React.ElementType;
  List?: React.ElementType;
  ContentFrame?: React.ElementType;
  TreeFrame?: React.ElementType;
  renderNode?: (node: DataNode, isLeaf: boolean) => React.ReactNode;
  searchQuery?: string;
  searchMethod?: (node: DataNode, searchQuery: string) => boolean;
  onNodeClick?: (node: DataNode) => void;
  onNodeExpand?: (node: DataNode) => void;
  onNodeCollapse?: (node: DataNode) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function TreeNode({ 
  data, 
  ListItem = 'li', 
  List = 'ul', 
  ContentFrame = 'div',
  renderNode,
  searchQuery,
  searchMethod,
  onNodeClick,
  onNodeExpand,
  onNodeCollapse
}: TreeNodeProps) {
  const { content, children, expanded = true, className, style } = data;
  const [isExpanded, setIsExpanded] = React.useState(expanded);
  const isLeaf = !children || children.length === 0;
  
  const handleClick = () => {
    if (onNodeClick) {
      onNodeClick(data);
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    if (!isExpanded && onNodeExpand) {
      onNodeExpand(data);
    } else if (isExpanded && onNodeCollapse) {
      onNodeCollapse(data);
    }
  };

  const shouldShowNode = !searchQuery || !searchMethod || searchMethod(data, searchQuery);
  
  if (!shouldShowNode) {
    return null;
  }

  let item;
  let treeNodesList;

  if (content !== undefined) {
    const nodeContent = renderNode ? renderNode(data, isLeaf) : content;
    item = (
      <ContentFrame 
        onClick={handleClick}
        className={className}
        style={style}
      >
        {!isLeaf && (
          <span 
            onClick={handleToggleExpand}
            style={{ cursor: 'pointer', marginRight: '8px' }}
          >
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
        {nodeContent}
      </ContentFrame>
    );
  }

  if (children && children.length > 0 && isExpanded) {
    const treeNodes = children.map((element, index) => (
      <TreeNode 
        data={element} 
        key={element.id ?? index}
        ListItem={ListItem}
        List={List}
        ContentFrame={ContentFrame}
        renderNode={renderNode}
        searchQuery={searchQuery}
        searchMethod={searchMethod}
        onNodeClick={onNodeClick}
        onNodeExpand={onNodeExpand}
        onNodeCollapse={onNodeCollapse}
      />
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

export function DeepTree({ 
  data, 
  ListItem = 'li', 
  List = 'ul', 
  ContentFrame = 'div', 
  TreeFrame = 'div',
  renderNode,
  searchQuery,
  searchMethod,
  onNodeClick,
  onNodeExpand,
  onNodeCollapse,
  className,
  style
}: DeepTreeProps) {
  return (
    <TreeFrame className={className} style={style}>
      <List>
        {data.map((object, index) => (
          <TreeNode 
            key={object.id ?? index} 
            data={object}
            ListItem={ListItem}
            List={List}
            ContentFrame={ContentFrame}
            renderNode={renderNode}
            searchQuery={searchQuery}
            searchMethod={searchMethod}
            onNodeClick={onNodeClick}
            onNodeExpand={onNodeExpand}
            onNodeCollapse={onNodeCollapse}
          />
        ))}
      </List>
    </TreeFrame>
  );
}

// Utility functions for tree data manipulation
export const treeUtils = {
  // Find a node by ID in the tree
  findNode: (data: DataNode[], id: string | number): DataNode | null => {
    for (const node of data) {
      if (node.id === id) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const found = treeUtils.findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  },

  // Find a node's path in the tree
  findNodePath: (data: DataNode[], id: string | number, path: number[] = []): number[] | null => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const currentPath = [...path, i];
      
      if (node.id === id) {
        return currentPath;
      }
      
      if (node.children && node.children.length > 0) {
        const foundPath = treeUtils.findNodePath(node.children, id, currentPath);
        if (foundPath) return foundPath;
      }
    }
    return null;
  },

  // Get all nodes matching a predicate
  filterNodes: (data: DataNode[], predicate: (node: DataNode) => boolean): DataNode[] => {
    const result: DataNode[] = [];
    
    const traverse = (nodes: DataNode[]) => {
      for (const node of nodes) {
        if (predicate(node)) {
          result.push(node);
        }
        if (node.children && node.children.length > 0) {
          traverse(node.children);
        }
      }
    };
    
    traverse(data);
    return result;
  },

  // Walk through all nodes in the tree
  walkTree: (data: DataNode[], callback: (node: DataNode, depth: number) => void, depth: number = 0): void => {
    for (const node of data) {
      callback(node, depth);
      if (node.children && node.children.length > 0) {
        treeUtils.walkTree(node.children, callback, depth + 1);
      }
    }
  },

  // Count total nodes in the tree
  countNodes: (data: DataNode[]): number => {
    let count = 0;
    treeUtils.walkTree(data, () => count++);
    return count;
  },

  // Get the maximum depth of the tree
  getMaxDepth: (data: DataNode[]): number => {
    let maxDepth = 0;
    treeUtils.walkTree(data, (_, depth) => {
      maxDepth = Math.max(maxDepth, depth);
    });
    return maxDepth + 1;
  },

  // Flatten tree to an array with depth information
  flattenTree: (data: DataNode[]): Array<{ node: DataNode; depth: number; path: number[] }> => {
    const result: Array<{ node: DataNode; depth: number; path: number[] }> = [];
    
    const flatten = (nodes: DataNode[], depth: number = 0, path: number[] = []) => {
      nodes.forEach((node, index) => {
        const currentPath = [...path, index];
        result.push({ node, depth, path: currentPath });
        
        if (node.children && node.children.length > 0) {
          flatten(node.children, depth + 1, currentPath);
        }
      });
    };
    
    flatten(data);
    return result;
  },

  // Default search method that searches in content
  defaultSearchMethod: (node: DataNode, searchQuery: string): boolean => {
    const query = searchQuery.toLowerCase();
    const content = String(node.content || '').toLowerCase();
    return content.includes(query);
  }
};

export default DeepTree;
