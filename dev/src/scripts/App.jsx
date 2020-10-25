import React from "react";
import DeepTree from "./components/tree/DeepTree.jsx";

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

export default function App() {
    return (
        //Под props  получаем data
        <DeepTree data={data}/>
    )
}

