import React from 'react';

const data = {
  content: "данные или текст",
  children: [
    {
      content: "данные или текст для вложенного элемента 1",
      children: [],
    },
    {
      content: "данные или текст для вложенного элемента 2",
      children: [],
    },
  ],
};

function TreeNode(props) {
  const content = props.data.content; //Заношу data.content в переменную myData
  const children = props.data.children; //Заношу data.ребенок в переменную myData
  let item;
  let treeNodesList;

  if (content !== undefined) {
    item = <div>{content}</div>;
  }
  if (children && children.length > 0) {
    const treeNodes = children.map((element) => <TreeNode data={element} />);
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
  return <TreeNode data={props.data} />;
}
  
export default DeepTree; 
