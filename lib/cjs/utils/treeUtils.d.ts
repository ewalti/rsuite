import React from 'react';
import { TreeNodeType, TreeNodesType } from '../CheckTreePicker/utils';
import { TREE_NODE_DROP_POSITION } from '../utils';
import { CheckTreePickerProps } from '../CheckTreePicker/CheckTreePicker';
import { TreePickerProps } from '../TreePicker/TreePicker';
import { ListHandle } from '../internals/Windowing';
declare type PartialTreeProps = Partial<TreePickerProps | CheckTreePickerProps>;
/**
 * according node parentNode expand state decide node whether to show
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */
export declare function shouldShowNodeByParentExpanded<T>(expandItemValues?: T[], parentKeys?: T[]): boolean;
/**
 * flatten tree structure to array
 * @param {*} tree
 * @param {*} childrenKey
 * @param {*} executor
 *
 * @deprecated This {@link UNSAFE_flattenTree} function is considered unsafe because it mutates `tree` argument in-place
 *             Use {@link flattenTree} instead.
 */
export declare function UNSAFE_flattenTree<TItem>(tree: TItem[], childrenKey?: string, executor?: (node: any, index: number) => any): TItem[];
export declare enum WalkTreeStrategy {
    DFS = 0,
    BFS = 1
}
export declare function flattenTree<T>(rootNodes: readonly T[], getChildren: (node: T) => readonly T[] | undefined, walkStrategy?: WalkTreeStrategy): T[];
export declare function walkTreeBfs<T>(rootNodes: readonly T[], getChildren: (node: T) => readonly T[] | undefined, callback: (node: T) => void): void;
export declare function walkTreeDfs<T>(rootNodes: readonly T[], getChildren: (node: T) => readonly T[] | undefined, callback: (node: T) => void): void;
/**
 * get all ancestor nodes of given node
 * @param {*} node
 */
export declare function getNodeParents(node: any, parentKey?: string, valueKey?: string): any[];
/**
 * get all parentKeys of given node
 * @param nodes
 * @param node
 * @param valueKey
 */
export declare function getNodeParentKeys<T>(nodes: TreeNodesType, node: TreeNodeType, valueKey: string): T[];
export declare function hasVisibleChildren(node: TreeNodeType, childrenKey: string): any;
/**
 * shallow equal array
 * @param a
 * @param b
 */
export declare function compareArray(a: any[], b: any[]): boolean;
export declare function getDefaultExpandItemValues<TItem>(data: TItem[], props: Required<Pick<TreePickerProps, 'defaultExpandAll' | 'valueKey' | 'childrenKey' | 'defaultExpandItemValues'>>): any[];
/**
 * 获取 expandItemValues 的 value
 * @param props
 */
export declare function getExpandItemValues(props: PartialTreeProps): any[];
/**
 * get dragNode and it's children node keys
 * @param node
 * @param childrenKey
 * @param valueKey
 */
export declare function getDragNodeKeys(dragNode: any, childrenKey: string, valueKey: string): any[];
export declare function calDropNodePosition(event: React.DragEvent, treeNodeElement: Element): -1 | TREE_NODE_DROP_POSITION;
export declare function removeDragNode(data: any[], params: any, { valueKey, childrenKey }: {
    valueKey: any;
    childrenKey: any;
}): void;
export declare function createUpdateTreeDataFunction(params: any, { valueKey, childrenKey }: {
    valueKey: any;
    childrenKey: any;
}): (tree: any[]) => any[];
export declare function findNodeOfTree(data: any, check: any): any;
declare type HasChildren<T extends Record<string, unknown>> = T & {
    children?: readonly HasChildren<T>[];
};
export declare function filterNodesOfTree<TItem extends HasChildren<Record<string, unknown>>>(data: readonly TItem[], check: (item: TItem) => boolean): TItem[];
/**
 * get all focusable items
 * exclude not visible and disabled node
 * @param filteredData - filtered tree data
 * @param props - TreeProps
 * @param isSearching - component is in Searching
 * @returns
 */
export declare const getFocusableItems: <TItem extends TreeNodeType>(filteredData: TItem[], props: Required<Pick<PartialTreeProps, 'disabledItemValues' | 'valueKey' | 'childrenKey' | 'expandItemValues'>>, isSearching?: boolean) => TItem[];
/**
 * return all focusable Item and active Element index
 * @param focusItemValue
 * @param focusableItems items
 */
export declare const getActiveIndex: (focusItemValue: any, focusItems: any[], valueKey: any) => number;
/**
 * get current active element and node data
 * @param flattenNodes - flattenData
 */
export declare const getActiveItem: (focusItemValue: string | number, flattenNodes: TreeNodesType, valueKey: string) => any;
export declare const getElementByDataKey: (dataKey: string, treeNodesRefs: any, selector: string) => Element | null;
/**
 * focus to specify tree node
 * @param refKey - target node refKey
 * @param treeNodeRefs - all tree node refs object
 * @param selector - node css selector
 */
export declare const focusTreeNode: (refKey: string, treeNodeRefs: any, selector: string) => void;
export interface FocusPrevOrNextProps {
    focusItemValue: string | number | null;
    focusableItems: any[];
    treeNodesRefs: any;
    selector: string;
    valueKey: string;
    callback: (value: string | number) => void;
}
/**
 * focus next item with keyboard
 * @param param
 */
export declare const focusNextItem: ({ focusItemValue, focusableItems, treeNodesRefs, selector, valueKey, callback }: FocusPrevOrNextProps) => void;
/**
 * focus prev item with keyboard
 * @param param
 */
export declare const focusPreviousItem: ({ focusItemValue, focusableItems, treeNodesRefs, selector, valueKey, callback }: FocusPrevOrNextProps) => void;
export interface ArrowHandlerProps {
    focusItem: TreeNodeType;
    expand: boolean;
    childrenKey: string;
    onExpand: (focusItem: TreeNodeType) => void;
    onFocusItem: () => void;
}
/**
 * Left arrow keyboard event handler
 * When focus is on an open node, closes the node.
 * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
 * When focus is on a root node that is also either an end node or a closed node, does nothing.
 * @see https://www.w3.org/TR/wai-aria-practices/#TreeView
 */
export declare function leftArrowHandler({ focusItem, expand, onExpand, onFocusItem }: ArrowHandlerProps): void;
/**
 * Right arrow keyboard event handler
 * When focus is on a closed node, opens the node; focus does not move.
 * When focus is on a open node, moves focus to the first child node.
 * When focus is on an end node, does nothing.
 * @see https://www.w3.org/TR/wai-aria-practices/#TreeView
 */
export declare function rightArrowHandler({ focusItem, expand, childrenKey, onExpand, onFocusItem }: ArrowHandlerProps): void;
/**
 * get scrollIndex in virtualized list
 * @param nodes - data
 * @param value - activeItem value
 * @param valueKey
 */
export declare const getScrollToIndex: (nodes: readonly TreeNodeType[], value: string | number, valueKey: string) => number;
/**
 * when searching, expand state always return true
 * @param searchKeyword
 * @param expand
 */
export declare function getExpandWhenSearching(searchKeyword: string, expand: boolean): boolean;
declare function getTreeActiveNode<T extends number | string | undefined>(nodes: TreeNodesType, value: T, valueKey: string): T extends undefined ? undefined : TreeNodeType | undefined;
export { getTreeActiveNode };
/**
 * toggle tree node
 * @param param0
 */
export declare function toggleExpand<T>({ node, isExpand, expandItemValues, valueKey }: ToggleExpandOptions<T>): T[];
declare type ToggleExpandOptions<T> = {
    node: Record<string, unknown>;
    isExpand: boolean;
    expandItemValues: T[];
    valueKey: string;
};
export declare function getTreeNodeTitle(label: any): string | undefined;
/**
 * get all children from flattenNodes object by given parent node
 * @param nodes
 * @param parent
 */
export declare function getChildrenByFlattenNodes(nodes: TreeNodesType, parent: TreeNodeType): TreeNodeType[];
export declare function useTreeDrag<T>(): {
    dragNode: T | null;
    dragOverNodeKey: null;
    dragNodeKeys: (string | number)[];
    dropNodePosition: -1 | TREE_NODE_DROP_POSITION | null;
    setDragNode: (node: T | null) => void;
    setDragOverNodeKey: React.Dispatch<React.SetStateAction<null>>;
    setDragNodeKeys: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    setDropNodePosition: React.Dispatch<React.SetStateAction<-1 | TREE_NODE_DROP_POSITION | null>>;
};
interface FlattenTreeDataProps {
    data: TreeNodeType[];
    labelKey: string;
    valueKey: string;
    childrenKey: string;
    uncheckableItemValues?: any[];
    callback?: (nodes: TreeNodesType) => void;
}
interface UnSerializeListProps {
    nodes: TreeNodesType;
    key: string;
    value: any[];
    cascade: boolean;
    uncheckableItemValues: any[];
}
/**
 * hooks for flatten tree structure
 * @param param0
 */
export declare function useFlattenTreeData({ data, labelKey, valueKey, childrenKey, uncheckableItemValues, callback }: FlattenTreeDataProps): {
    forceUpdate: () => void;
    flattenNodes: TreeNodesType;
    flattenTreeData: (treeData: TreeNodeType[], parent?: TreeNodeType, layer?: any) => never[] | undefined;
    serializeListOnlyParent: (nodes: TreeNodesType, key: string) => (string | number)[];
    unSerializeList: ({ nodes, key, value, cascade, uncheckableItemValues }: UnSerializeListProps) => void;
    formatVirtualizedTreeData: (nodes: TreeNodesType, data: any[], expandItemValues: unknown[], options: {
        cascade?: boolean;
        searchKeyword?: string;
    }) => TreeNodeType[];
};
/**
 * A hook that saving every tree node ref
 */
export declare function useTreeNodeRefs(): {
    treeNodesRefs: {};
    saveTreeNodeRef: (ref: React.Ref<any>, refKey?: string) => void;
};
interface TreeSearchProps<T> {
    labelKey: string;
    childrenKey: string;
    searchKeyword?: string;
    data: T[];
    searchBy?: (keyword: any, label: any, item: any) => boolean;
    callback?: (keyword: string, data: T[], event: React.SyntheticEvent) => void;
}
/**
 * A hook that handles tree search filter options
 * @param props
 */
export declare function useTreeSearch<T>(props: TreeSearchProps<T>): {
    searchKeywordState: string;
    filteredData: T[];
    setFilteredData: (data: T[], searchKeyword: string) => void;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (searchKeyword: string, event?: React.ChangeEvent) => void;
};
export declare function useGetTreeNodeChildren<T extends Record<string, unknown>>(treeData: T[], valueKey: string, childrenKey: string): {
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
    loadingNodeValues: never[];
    loadChildren: (node: any, getChildren: any) => void;
};
export interface FocusToTreeNodeProps {
    selector: string;
    valueKey: string;
    activeNode: any;
    virtualized: boolean;
    container: HTMLElement | null;
    list: ListHandle;
    formattedNodes: TreeNodeType[];
}
/**
 * Focus to active tree node.
 * @param param0
 */
export declare function focusToActiveTreeNode({ list, valueKey, activeNode, virtualized, container, selector, formattedNodes }: FocusToTreeNodeProps): void;
export declare function isSearching(searchKeyword?: string): boolean;
export declare function getTreeNodeIndent(rtl: any, layer: any, absolute?: boolean): {
    [x: string]: number;
};
/**
 * according to the value type to get the formatted valueKey of the node
 * @param value
 * @returns
 */
export declare function getNodeFormattedRefKey(value: string | number): string;
/**
 * create drag preview when tree node start drag
 * @param name
 * @param className
 * @returns
 */
export declare function createDragPreview(name: string, className: string): HTMLDivElement;
/**
 * remove drag preview when tree node drop
 */
export declare function removeDragPreview(): void;
export declare function stringifyTreeNodeLabel(label: string | React.ReactNode): string;
/**
 * Returns a WeakMap that maps each item in `items` to its parent
 * indicated by `getChildren` function
 */
export declare function getParentMap<T extends Record<string, unknown>>(items: readonly T[], getChildren: (item: T) => readonly T[] | undefined): WeakMap<T, T>;
/**
 * Returns a Map that maps each item's "key", indicated by `getKey` function,
 * to its parent indicated by `getChildren` function
 *
 * NOTICE:
 * Using this function is discouraged.
 * Use {@link getParentMap} whenever possible.
 */
export declare function getKeyParentMap<T extends Record<string, unknown>, K = React.Key>(items: readonly T[], getKey: (item: T) => K, getChildren: (item: T) => readonly T[] | undefined): Map<K, T>;
/**
 * Returns an array indicating the hierarchy path from root towards `target` item
 */
export declare function getPathTowardsItem<T>(target: T | undefined, getParent: (item: T) => T | undefined): T[];
