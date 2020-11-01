"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepTree = void 0;
const react_1 = __importDefault(require("react"));
function TreeNode({ data }) {
    const { content, children } = data;
    let item;
    let treeNodesList;
    if (content !== undefined) {
        item = react_1.default.createElement("div", null, content);
    }
    if (children && children.length > 0) {
        const treeNodes = children.map((element, index) => react_1.default.createElement(TreeNode, { data: element, key: index }));
        treeNodesList = react_1.default.createElement("ul", null, treeNodes);
    }
    return (react_1.default.createElement("li", null,
        item,
        treeNodesList));
}
function DeepTree({ data }) {
    return (react_1.default.createElement("ul", null,
        " ",
        data.map((object, index) => react_1.default.createElement(TreeNode, { key: index, data: object })),
        " "));
}
exports.DeepTree = DeepTree;
exports.default = DeepTree;
//# sourceMappingURL=index.js.map