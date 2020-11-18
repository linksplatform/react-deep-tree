# react-deep-tree

An attempt to make traversing trees with deep-deep structure user-friendly. Started as a part of our [UI prototype](https://github.com/linksplatform/InfiniteDepthTreeWebUIPrototype).

## Install

```Shell
npm i react-deep-tree
```

## [Use](https://codesandbox.io/s/react-deep-tree-example-kw2fi)

```JavaScript
import React from "react";
import DeepTree from "react-deep-tree";
import type { DataNode } from "react-deep-tree";

const data : DataNode[] = [
  {
    content: 'Text of a first level of the first element',
    children: [
      {
        content: 'Text of a second level of the first element',
        children: [],
      },
      {
        content: 'Text of a second level of the first element',
        children: [],
      },
    ],
  },
  {
    content: 'Text of a first level of the second element',
    children: [
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
    ],
  },
];

export default function App() {
  return <DeepTree data={data}/>;
}
```
