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
exports.BasicUsageExample = void 0;
const react_1 = __importDefault(require("react"));
const index_1 = __importStar(require("../index"));
const basicData = [
    {
        id: '1',
        content: 'Root Item 1',
        children: [
            {
                id: '1-1',
                content: 'Child 1.1',
                children: [
                    {
                        id: '1-1-1',
                        content: 'Grandchild 1.1.1',
                        children: []
                    }
                ]
            },
            {
                id: '1-2',
                content: 'Child 1.2',
                children: []
            }
        ]
    },
    {
        id: '2',
        content: 'Root Item 2',
        children: [
            {
                id: '2-1',
                content: 'Child 2.1',
                children: []
            }
        ]
    }
];
exports.BasicUsageExample = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Basic Tree Usage"),
        react_1.default.createElement(index_1.default, { data: basicData }),
        react_1.default.createElement("h3", null, "Tree Statistics"),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                "Total nodes: ",
                index_1.treeUtils.countNodes(basicData)),
            react_1.default.createElement("li", null,
                "Max depth: ",
                index_1.treeUtils.getMaxDepth(basicData)))));
};
exports.default = exports.BasicUsageExample;
//# sourceMappingURL=basic-usage.js.map