import React from "react";
import DeepTree from "./components/tree/DeepTree.jsx";

export default function App() {
    return (
        <DeepTree data={data}/>
    )
}


const data = [
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
]

