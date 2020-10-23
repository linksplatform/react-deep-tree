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

const data = {
  content: "Text of a first level element",
  children: [
    {
      content: "Text of a second level element",
      children: [],
    },
    {
      content: "Text of a second level element",
      children: [],
    },
  ],
};

export default function App() {
  return <DeepTree data={data} />;
}
```
