import DeepTree from "react-deep-tree";
import type { DataNode } from "react-deep-tree";
import React from "react";

const data: DataNode[] = [
    {
        content: "Text of a first level of the first element",
        children: [
            {
                content: "Text of a second level of the first element",
                children: [],
            },
            {
                content: "Text of a second level of the first element",
                children: [],
            },
        ],
    },
    {
        content: "Text of a first level of the second element",
        children: [
            {
                content: "Text of a second level of the second element",
                children: [],
            },
            {
                content: "Text of a second level of the second element",
                children: [],
            },
        ],
    },
]

export default function Index() {
    return <DeepTree data={data}/>
}
