// @ts-ignore
import React from 'react';

function TreeNode({data}) {
    const {content, children} = data;
    let item;
    let treeNodesList;

    if (content !== undefined) {
        item = <div>{content}</div>;
    }
    if (children && children.length > 0) {
        // @ts-ignore
        const treeNodes = children.map((element, index) => <TreeNode data={element} key={index} />);
        treeNodesList = <ul>{treeNodes}</ul>;
    }
    return (
        <li>
            {item}
            {treeNodesList}
        </li>
    );
}

export function DeepTree({data}) {
    return (
        data.map((object, index) =>
            (
                <ul key={index}>
                    <TreeNode data={object}/>
                </ul>
            )
        )
    );
}

export default DeepTree;
