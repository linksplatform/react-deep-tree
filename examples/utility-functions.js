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
exports.UtilityFunctionsExample = void 0;
const react_1 = __importStar(require("react"));
const index_1 = require("../index");
const utilsData = [
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
exports.UtilityFunctionsExample = () => {
    const [selectedNodeId, setSelectedNodeId] = react_1.useState('');
    const [searchResult, setSearchResult] = react_1.useState(null);
    const [nodePath, setNodePath] = react_1.useState(null);
    const handleFindNode = () => {
        if (selectedNodeId) {
            const found = index_1.treeUtils.findNode(utilsData, selectedNodeId);
            const path = index_1.treeUtils.findNodePath(utilsData, selectedNodeId);
            setSearchResult(found);
            setNodePath(path);
        }
    };
    const flattenedTree = index_1.treeUtils.flattenTree(utilsData);
    const filteredNodes = index_1.treeUtils.filterNodes(utilsData, node => String(node.content).toLowerCase().includes('.tsx'));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Utility Functions Example"),
        react_1.default.createElement("div", { style: { marginBottom: '20px' } },
            react_1.default.createElement("h3", null, "Tree Statistics"),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    "Total nodes: ",
                    index_1.treeUtils.countNodes(utilsData)),
                react_1.default.createElement("li", null,
                    "Maximum depth: ",
                    index_1.treeUtils.getMaxDepth(utilsData)),
                react_1.default.createElement("li", null,
                    "TypeScript files: ",
                    filteredNodes.length))),
        react_1.default.createElement("div", { style: { marginBottom: '20px' } },
            react_1.default.createElement("h3", null, "Find Node by ID"),
            react_1.default.createElement("input", { type: "text", placeholder: "Enter node ID (e.g., 'button', 'api')", value: selectedNodeId, onChange: (e) => setSelectedNodeId(e.target.value), style: {
                    padding: '8px',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                } }),
            react_1.default.createElement("button", { onClick: handleFindNode, style: {
                    padding: '8px 16px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                } }, "Find Node"),
            searchResult && (react_1.default.createElement("div", { style: { marginTop: '10px', padding: '10px', background: '#e8f5e8' } },
                react_1.default.createElement("strong", null, "Found:"),
                " ",
                searchResult.content,
                react_1.default.createElement("br", null),
                react_1.default.createElement("strong", null, "Path:"),
                " [",
                (nodePath === null || nodePath === void 0 ? void 0 : nodePath.join(' → ')) || 'N/A',
                "]"))),
        react_1.default.createElement("div", { style: { marginBottom: '20px' } },
            react_1.default.createElement("h3", null, "Flattened Tree Structure"),
            react_1.default.createElement("div", { style: {
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    padding: '10px',
                    background: '#f9f9f9'
                } }, flattenedTree.map(({ node, depth, path }, index) => (react_1.default.createElement("div", { key: index, style: { marginLeft: `${depth * 20}px`, padding: '2px 0' } },
                react_1.default.createElement("span", { style: { color: '#666' } },
                    "[",
                    path.join('.'),
                    "]"),
                node.content,
                react_1.default.createElement("span", { style: { color: '#999', fontSize: '12px' } },
                    ' ',
                    "(depth: ",
                    depth,
                    ")")))))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "Filtered Nodes (TypeScript files)"),
            react_1.default.createElement("ul", null, filteredNodes.map((node, index) => (react_1.default.createElement("li", { key: index },
                node.content,
                " (ID: ",
                node.id,
                ")")))))));
};
exports.default = exports.UtilityFunctionsExample;
//# sourceMappingURL=utility-functions.js.map