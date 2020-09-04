import React from 'react';

function TreeNode(props) {
  const myData = props.data.content; 
  const myDataChildren = props.data.children; 
  let item;
  let treeNodes;
  let treeNodesList;
 
  //Если по ключу  content не пусто, тогда обрисовываем element.
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
 
//Возвращаем из DeepTree компонент TreeNode с ключом data : {obj}
export function DeepTree(props) { 
  //Получаем для удобства переменную в которую заносим props.data
  const myData = props.data; 
  return <TreeNode data={myData} />;
}
  
export default DeepTree; 
