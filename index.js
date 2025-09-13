"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepTree = exports.TreeNode = exports.useTreeNavigation = void 0;
const react_1 = __importStar(require("react"));
function flattenTree(data, level = 0) {
    const result = [];
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
function useTreeNavigation({ data, enableNavigation, onNodeSelect }) {
    const [selectedIndex, setSelectedIndex] = react_1.useState(0);
    const [query, setQuery] = react_1.useState('');
    const [showQuery, setShowQuery] = react_1.useState(false);
    const flatNodes = react_1.useMemo(() => flattenTree(data), [data]);
    const filteredNodes = react_1.useMemo(() => {
        if (!query) {
            return flatNodes;
        }
        return flatNodes.filter(({ node }) => node.content && node.content.toString().toLowerCase().includes(query.toLowerCase()));
    }, [flatNodes, query]);
    const currentNode = filteredNodes[selectedIndex];
    const navigateUp = react_1.useCallback(() => {
        setSelectedIndex((prev) => Math.max(0, prev - 1));
    }, []);
    const navigateDown = react_1.useCallback(() => {
        setSelectedIndex((prev) => Math.min(filteredNodes.length - 1, prev + 1));
    }, [filteredNodes.length]);
    const toggleQuery = react_1.useCallback(() => {
        setShowQuery((prev) => !prev);
        if (showQuery) {
            setQuery('');
        }
    }, [showQuery]);
    react_1.useEffect(() => {
        if (!enableNavigation)
            return;
        const handleKeyDown = (event) => {
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
        const handleWheel = (event) => {
            if (event.deltaY > 0) {
                navigateDown();
            }
            else {
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
    react_1.useEffect(() => {
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
exports.useTreeNavigation = useTreeNavigation;
function TreeNode({ data, ListItem = 'li', List = 'ul', ContentFrame = 'div', level = 0, isSelected = false, onSelect, nodeIndex = 0, className = '' }) {
    const { content, children } = data;
    const nodeRef = react_1.useRef(null);
    react_1.useEffect(() => {
        if (isSelected && nodeRef.current) {
            nodeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [isSelected]);
    const handleClick = react_1.useCallback(() => {
        if (onSelect) {
            onSelect(data, nodeIndex);
        }
    }, [data, nodeIndex, onSelect]);
    let item;
    let treeNodesList;
    if (content !== undefined) {
        item = (react_1.default.createElement(ContentFrame, { className: isSelected ? 'selected' : '', onClick: handleClick, style: {
                cursor: 'pointer',
                padding: '4px 8px',
                backgroundColor: isSelected ? '#EA7500' : 'transparent',
                color: isSelected ? '#fff' : 'inherit',
                transition: 'all 0.3s ease-in-out'
            } }, content));
    }
    if (children && children.length > 0) {
        const treeNodes = children.map((element, index) => (react_1.default.createElement(TreeNode, { data: element, key: index, ListItem: ListItem, List: List, ContentFrame: ContentFrame, level: level + 1, isSelected: false, onSelect: onSelect, nodeIndex: index })));
        treeNodesList = react_1.default.createElement(List, { style: { marginLeft: level > 0 ? '20px' : '0' } }, treeNodes);
    }
    return (react_1.default.createElement(ListItem, { ref: nodeRef, className: className, style: {
            listStyle: 'none',
            margin: '2px 0'
        } },
        item,
        treeNodesList));
}
exports.TreeNode = TreeNode;
function DeepTree({ data, ListItem = 'li', List = 'ul', ContentFrame = 'div', TreeFrame = 'div', enableNavigation = false, enableSearch = false, onNodeSelect, selectedIndex, className = '', style = {} }) {
    const navigation = useTreeNavigation({
        data,
        enableNavigation,
        onNodeSelect
    });
    const currentSelectedIndex = selectedIndex !== undefined ? selectedIndex : navigation.selectedIndex;
    const defaultStyle = Object.assign({ fontFamily: 'Verdana, sans-serif, Calibri', fontSize: '15px', lineHeight: '1.5em', backgroundColor: '#1F1F1F', color: '#959595', padding: '20px', minHeight: '100vh' }, style);
    return (react_1.default.createElement(TreeFrame, { className: className, style: defaultStyle },
        (enableSearch || navigation.showQuery) && (react_1.default.createElement("div", { style: {
                position: 'fixed',
                top: '20px',
                left: '20px',
                right: '20px',
                zIndex: 1000
            } },
            react_1.default.createElement("input", { type: "text", value: navigation.query, onChange: (e) => navigation.setQuery(e.target.value), placeholder: "Search...", autoComplete: "off", spellCheck: false, style: {
                    width: '100%',
                    padding: '10px 15px',
                    backgroundColor: '#2A2A2A',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '16px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    outline: 'none'
                }, autoFocus: true }))),
        react_1.default.createElement("div", { style: { marginTop: navigation.showQuery ? '80px' : '0' } },
            react_1.default.createElement(List, { style: { padding: 0, margin: 0 } }, navigation.query ?
                navigation.filteredNodes.map((item, index) => {
                    const isSelected = enableNavigation && index === currentSelectedIndex;
                    return (react_1.default.createElement(TreeNode, { key: index, data: item.node, ListItem: ListItem, List: List, ContentFrame: ContentFrame, isSelected: isSelected, onSelect: navigation.currentNode ?
                            (node, nodeIndex) => onNodeSelect === null || onNodeSelect === void 0 ? void 0 : onNodeSelect(node, nodeIndex) :
                            undefined, nodeIndex: index }));
                }) :
                data.map((item, index) => {
                    const isSelected = enableNavigation && index === currentSelectedIndex;
                    return (react_1.default.createElement(TreeNode, { key: index, data: item, ListItem: ListItem, List: List, ContentFrame: ContentFrame, isSelected: isSelected, onSelect: navigation.currentNode ?
                            (node, nodeIndex) => onNodeSelect === null || onNodeSelect === void 0 ? void 0 : onNodeSelect(node, nodeIndex) :
                            undefined, nodeIndex: index }));
                })))));
}
exports.DeepTree = DeepTree;
exports.default = DeepTree;
//# sourceMappingURL=index.js.map