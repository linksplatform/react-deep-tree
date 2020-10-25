//Возвращаем из DeepTree компонент TreeNode с ключом data : {obj}
import TreeNode from "./TreeNode.jsx";
import React from "react";

export default function DeepTree({data}) {
    return (
        <ul>
            {data.map((element, index) => <DeepTree data={element} key={index} />)}
        </ul>
    );
    //return <TreeNode data={props.data} />;
}