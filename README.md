# React Deep Tree

A React component for rendering infinite depth tree structures with navigation, search, and keyboard controls. This package is adapted from the [InfiniteDepthTreeWebUIPrototype](https://github.com/linksplatform/InfiniteDepthTreeWebUIPrototype) repository and provides a React-based implementation for client-side tree navigation.

## Features

- ✨ **Infinite Depth**: Support for unlimited levels of nested tree structures
- ⌨️ **Keyboard Navigation**: Arrow keys, mouse wheel navigation
- 🔍 **Search Functionality**: Real-time search with filtering
- 🎨 **Customizable Components**: Replace default HTML elements with custom components
- 🖱️ **Mouse Interactions**: Click to select, smooth scrolling
- 📱 **Responsive Design**: Mobile-friendly layout
- 🎯 **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
npm install react-deep-tree
```

## Quick Start

```tsx
import DeepTree, { DataNode } from 'react-deep-tree';

const data: DataNode[] = [
  {
    content: 'Root Item',
    children: [
      { content: 'Child 1' },
      { 
        content: 'Child 2',
        children: [
          { content: 'Grandchild 1' },
          { content: 'Grandchild 2' }
        ]
      }
    ]
  }
];

export default function App() {
  return <DeepTree data={data} />;
}
```

## Advanced Usage

### With Navigation and Search

```tsx
import DeepTree from 'react-deep-tree';

function NavigableTree() {
  return (
    <DeepTree
      data={data}
      enableNavigation={true}
      enableSearch={true}
      onNodeSelect={(node, index) => {
        console.log('Selected:', node.content);
      }}
    />
  );
}
```

### Custom Components

```tsx
const CustomListItem = ({ children, ...props }) => (
  <div className="my-custom-item" {...props}>
    {children}
  </div>
);

function CustomTree() {
  return (
    <DeepTree
      data={data}
      ListItem={CustomListItem}
      ContentFrame="span"
      TreeFrame="section"
    />
  );
}
```

## API Reference

### DeepTree Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `DataNode[]` | - | **Required.** The tree data structure |
| `enableNavigation` | `boolean` | `false` | Enable keyboard/mouse navigation |
| `enableSearch` | `boolean` | `false` | Show search input by default |
| `onNodeSelect` | `(node: DataNode, index: number) => void` | - | Callback when a node is selected |
| `selectedIndex` | `number` | - | Controlled selected index |
| `ListItem` | `React.ElementType` | `'li'` | Component for list items |
| `List` | `React.ElementType` | `'ul'` | Component for lists |
| `ContentFrame` | `React.ElementType` | `'div'` | Component for content wrapper |
| `TreeFrame` | `React.ElementType` | `'div'` | Component for tree wrapper |
| `className` | `string` | `''` | CSS class for the tree container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for the tree container |

### DataNode Interface

```tsx
interface DataNode {
  readonly content: any;
  readonly children?: DataNode[];
}
```

### Navigation Hook

You can also use the navigation functionality separately:

```tsx
import { useTreeNavigation } from 'react-deep-tree';

function MyComponent() {
  const navigation = useTreeNavigation({
    data: myData,
    enableNavigation: true,
    onNodeSelect: handleSelect
  });

  // Access navigation state
  console.log(navigation.selectedIndex);
  console.log(navigation.query);
  console.log(navigation.showQuery);
}
```

## Keyboard Shortcuts

When `enableNavigation` is true:

- `↑/↓ Arrow Keys`: Navigate up/down through items
- `Mouse Wheel`: Navigate through items
- `/`: Toggle search input
- `Escape`: Close search input

## Styling

The component includes default styling inspired by the original prototype. You can:

1. **Use the included CSS file:**
   ```tsx
   import 'react-deep-tree/styles.css';
   ```

2. **Override with custom styles:**
   ```css
   .deep-tree {
     background-color: your-color;
   }
   ```

3. **Use custom components** for complete control over styling

## Examples

Check the `/example` directory for comprehensive examples including:

- Basic tree rendering
- Navigation-enabled trees
- Search functionality
- Custom styled components
- Interactive demos

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run linting
npm run lint
```

## License

LGPL-3.0 - See LICENSE file for details.

## Contributing

This project is part of the Links Platform ecosystem. Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## Credits

Adapted from the [InfiniteDepthTreeWebUIPrototype](https://github.com/linksplatform/InfiniteDepthTreeWebUIPrototype) by Links Platform.
