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
exports.SearchExample = void 0;
const react_1 = __importStar(require("react"));
const index_1 = __importStar(require("../index"));
const searchData = [
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
exports.SearchExample = () => {
    const [searchQuery, setSearchQuery] = react_1.useState('');
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Search Functionality Example"),
        react_1.default.createElement("div", { style: { marginBottom: '20px' } },
            react_1.default.createElement("input", { type: "text", placeholder: "Search tree nodes...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), style: {
                    padding: '8px',
                    fontSize: '14px',
                    width: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                } })),
        react_1.default.createElement(index_1.default, { data: searchData, searchQuery: searchQuery, searchMethod: index_1.treeUtils.defaultSearchMethod }),
        searchQuery && (react_1.default.createElement("div", { style: { marginTop: '20px', padding: '10px', background: '#f5f5f5' } },
            react_1.default.createElement("h4", null, "Search Results:"),
            react_1.default.createElement("p", null,
                "Showing nodes containing: \"",
                searchQuery,
                "\""),
            react_1.default.createElement("p", null,
                "Matching nodes: ",
                index_1.treeUtils.filterNodes(searchData, node => index_1.treeUtils.defaultSearchMethod(node, searchQuery)).length)))));
};
exports.default = exports.SearchExample;
//# sourceMappingURL=search-example.js.map