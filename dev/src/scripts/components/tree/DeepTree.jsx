//Возвращаем из DeepTree компонент TreeNode с ключом data : {obj}
import TreeNode from "./TreeNode.jsx";
import React from "react";

export default function DeepTree({data}) {
    //data  - это props.data
    //props = data={data}
    return (
            data.map((object, index) => <ul>{<TreeNode data={object} key={index}/>}</ul>)
    );
    //return <TreeNode data={props.data} />;
}