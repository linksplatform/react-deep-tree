//Возвращаем из DeepTree компонент TreeNode с ключом data : {obj}
import TreeNode from "./TreeNode.jsx";
import React from "react";

export default function DeepTree({data}) {
    return (
        <ul>
            {console.log(data)}
            {
                data.map((element, index) => {
                    return (
                        <DeepTree  data={element} key={index}>
                            <TreeNode/>
                        </DeepTree>
                    )
                })
            }
        </ul>
    );
    //return <TreeNode data={props.data} />;
}