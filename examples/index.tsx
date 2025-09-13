export { default as BasicUsageExample } from './basic-usage';
export { default as SearchExample } from './search-example';
export { default as CustomRenderingExample } from './custom-rendering';
export { default as UtilityFunctionsExample } from './utility-functions';

// Re-export main library components for convenience
export { default as DeepTree, treeUtils } from '../index';
export type { DataNode, TreeNodeProps, DeepTreeProps } from '../index';