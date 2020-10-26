import React from "react";

export default function TreeNode({data}) {
    const {content, children} = data;
    //const content = props.data.content; //Заношу data.content в переменную myData
    //const children = props.data.children; //Заношу data.ребенок в переменную myData
    let item;
    let treeNodesList;

    if (content !== undefined) {
        item = <div>{content}</div>;
    }
    if (children && children.length > 0) {
        const treeNodes = children.map((element) => <TreeNode data={element} key={element.id} />);
        treeNodesList = <ul>{treeNodes}</ul>;
    }
    return (
        <li>
            {item}
            {treeNodesList}
        </li>
    );
}