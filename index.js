"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeUtils = exports.DeepTree = exports.TreeNode = void 0;
const react_1 = __importDefault(require("react"));
function TreeNode({ data, ListItem = 'li', List = 'ul', ContentFrame = 'div', renderNode, searchQuery, searchMethod, onNodeClick, onNodeExpand, onNodeCollapse }) {
    const { content, children, expanded = true, className, style } = data;
    const [isExpanded, setIsExpanded] = react_1.default.useState(expanded);
    const isLeaf = !children || children.length === 0;
    const handleClick = () => {
        if (onNodeClick) {
            onNodeClick(data);
        }
    };
    const handleToggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
        if (!isExpanded && onNodeExpand) {
            onNodeExpand(data);
        }
        else if (isExpanded && onNodeCollapse) {
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
        item = (react_1.default.createElement(ContentFrame, { onClick: handleClick, className: className, style: style },
            !isLeaf && (react_1.default.createElement("span", { onClick: handleToggleExpand, style: { cursor: 'pointer', marginRight: '8px' } }, isExpanded ? '▼' : '▶')),
            nodeContent));
    }
    if (children && children.length > 0 && isExpanded) {
        const treeNodes = children.map((element, index) => {
            var _a;
            return (react_1.default.createElement(TreeNode, { data: element, key: (_a = element.id) !== null && _a !== void 0 ? _a : index, ListItem: ListItem, List: List, ContentFrame: ContentFrame, renderNode: renderNode, searchQuery: searchQuery, searchMethod: searchMethod, onNodeClick: onNodeClick, onNodeExpand: onNodeExpand, onNodeCollapse: onNodeCollapse }));
        });
        treeNodesList = react_1.default.createElement(List, null, treeNodes);
    }
    return (react_1.default.createElement(ListItem, null,
        item,
        treeNodesList));
}
exports.TreeNode = TreeNode;
function DeepTree({ data, ListItem = 'li', List = 'ul', ContentFrame = 'div', TreeFrame = 'div', renderNode, searchQuery, searchMethod, onNodeClick, onNodeExpand, onNodeCollapse, className, style }) {
    return (react_1.default.createElement(TreeFrame, { className: className, style: style },
        react_1.default.createElement(List, null, data.map((object, index) => {
            var _a;
            return (react_1.default.createElement(TreeNode, { key: (_a = object.id) !== null && _a !== void 0 ? _a : index, data: object, ListItem: ListItem, List: List, ContentFrame: ContentFrame, renderNode: renderNode, searchQuery: searchQuery, searchMethod: searchMethod, onNodeClick: onNodeClick, onNodeExpand: onNodeExpand, onNodeCollapse: onNodeCollapse }));
        }))));
}
exports.DeepTree = DeepTree;
exports.treeUtils = {
    findNode: (data, id) => {
        for (const node of data) {
            if (node.id === id) {
                return node;
            }
            if (node.children && node.children.length > 0) {
                const found = exports.treeUtils.findNode(node.children, id);
                if (found)
                    return found;
            }
        }
        return null;
    },
    findNodePath: (data, id, path = []) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const currentPath = [...path, i];
            if (node.id === id) {
                return currentPath;
            }
            if (node.children && node.children.length > 0) {
                const foundPath = exports.treeUtils.findNodePath(node.children, id, currentPath);
                if (foundPath)
                    return foundPath;
            }
        }
        return null;
    },
    filterNodes: (data, predicate) => {
        const result = [];
        const traverse = (nodes) => {
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
    walkTree: (data, callback, depth = 0) => {
        for (const node of data) {
            callback(node, depth);
            if (node.children && node.children.length > 0) {
                exports.treeUtils.walkTree(node.children, callback, depth + 1);
            }
        }
    },
    countNodes: (data) => {
        let count = 0;
        exports.treeUtils.walkTree(data, () => count++);
        return count;
    },
    getMaxDepth: (data) => {
        let maxDepth = 0;
        exports.treeUtils.walkTree(data, (_, depth) => {
            maxDepth = Math.max(maxDepth, depth);
        });
        return maxDepth + 1;
    },
    flattenTree: (data) => {
        const result = [];
        const flatten = (nodes, depth = 0, path = []) => {
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
    defaultSearchMethod: (node, searchQuery) => {
        const query = searchQuery.toLowerCase();
        const content = String(node.content || '').toLowerCase();
        return content.includes(query);
    }
};
exports.default = DeepTree;
//# sourceMappingURL=index.js.map