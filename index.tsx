import React from 'react';

function TreeNode(props) {
  const myData = props.data.content; //Заношу data.content в переменную myData
  const myDataChildren = props.data.children; //Заношу data.ребенок в переменную myData
  let item;
  let treeNodes;
  let treeNodesList;

  if (myData !== undefined) {
    item = <div>{myData}</div>;
  }
  if (myDataChildren !== undefined && myDataChildren.length > 0) {
    treeNodes = myDataChildren.map((child) => <TreeNode data={child} />);
    treeNodesList = <ul>{treeNodes}</ul>;
  }
  return (
    <li>
      {item}
      {treeNodesList}
    </li>
  );
}

function DeepTree(props) {
  const myData = props.data; //Заношу data в переменную myData
  return <TreeNode data={myData} />;
}

export function App() {  
  return  ( 
    <ul> 
      <DeepTree data={data}/>
    </ul>
  )
}
export default App;