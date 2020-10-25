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

function TreeNode({data}) {
  const {content, children} = data;
  //const content = props.data.content; //Заношу data.content в переменную myData
  //const children = props.data.children; //Заношу data.ребенок в переменную myData
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
function DeepTree({data}) {
  return (
      <ul>
        {data.map(element => <DeepTree data={element} />)}
      </ul>
  );
  //return <TreeNode data={props.data} />;
}

function App() {  
  return  (
      <DeepTree data={data}/>
  )
}

function renderReactElement() {
  const element = (
    <div>
      <App />
    </div>
  );
  ReactDOM.render(element, document.getElementById("react-deep-tree"));
}
renderReactElement();
 