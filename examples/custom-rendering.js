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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRenderingExample = void 0;
const react_1 = __importStar(require("react"));
const index_1 = __importDefault(require("../index"));
const customData = [
    {
        id: 'user1',
        content: 'John Doe',
        children: [
            {
                id: 'project1',
                content: 'Web Dashboard',
                children: [
                    {
                        id: 'task1',
                        content: 'Login System',
                        children: []
                    },
                    {
                        id: 'task2',
                        content: 'User Profile',
                        children: []
                    }
                ]
            }
        ],
        metadata: {
            type: 'user',
            email: 'john@example.com',
            avatar: '👤'
        }
    },
    {
        id: 'user2',
        content: 'Jane Smith',
        children: [
            {
                id: 'project2',
                content: 'Mobile App',
                children: [
                    {
                        id: 'task3',
                        content: 'Authentication',
                        children: []
                    }
                ]
            }
        ],
        metadata: {
            type: 'user',
            email: 'jane@example.com',
            avatar: '👩'
        }
    }
];
exports.CustomRenderingExample = () => {
    const [clickedNode, setClickedNode] = react_1.useState(null);
    const customRenderNode = (node, isLeaf) => {
        var _a, _b;
        const { metadata } = node;
        if ((metadata === null || metadata === void 0 ? void 0 : metadata.type) === 'user') {
            return (react_1.default.createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    background: '#e3f2fd',
                    borderRadius: '4px',
                    border: '1px solid #2196f3'
                } },
                react_1.default.createElement("span", { style: { marginRight: '8px' } }, metadata.avatar),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, node.content),
                    react_1.default.createElement("div", { style: { fontSize: '12px', color: '#666' } }, metadata.email))));
        }
        if ((_a = node.id) === null || _a === void 0 ? void 0 : _a.toString().startsWith('project')) {
            return (react_1.default.createElement("div", { style: {
                    padding: '4px 8px',
                    background: '#f3e5f5',
                    borderRadius: '4px',
                    border: '1px solid #9c27b0'
                } },
                "\uD83D\uDCC1 ",
                react_1.default.createElement("strong", null, node.content)));
        }
        if ((_b = node.id) === null || _b === void 0 ? void 0 : _b.toString().startsWith('task')) {
            return (react_1.default.createElement("div", { style: {
                    padding: '2px 6px',
                    background: '#e8f5e8',
                    borderRadius: '3px',
                    border: '1px solid #4caf50'
                } },
                "\u2705 ",
                node.content));
        }
        return react_1.default.createElement("span", null, node.content);
    };
    const handleNodeClick = (node) => {
        setClickedNode(node);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Custom Node Rendering Example"),
        react_1.default.createElement(index_1.default, { data: customData, renderNode: customRenderNode, onNodeClick: handleNodeClick }),
        clickedNode && (react_1.default.createElement("div", { style: {
                marginTop: '20px',
                padding: '15px',
                background: '#f0f0f0',
                borderRadius: '5px',
                border: '1px solid #ddd'
            } },
            react_1.default.createElement("h4", null, "Clicked Node Details:"),
            react_1.default.createElement("pre", null, JSON.stringify(clickedNode, null, 2))))));
};
exports.default = exports.CustomRenderingExample;
//# sourceMappingURL=custom-rendering.js.map