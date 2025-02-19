import React from 'react';
import { PickerLocale } from '../locales';
import { PickerComponent, PickerToggleProps } from '../internals/Picker';
import { TreeDragProps, TreeBaseProps } from '../Tree/Tree';
import { FormControlPickerProps, ItemDataType } from '../@types/common';
export interface TreePickerProps<T = number | string> extends TreeBaseProps<T, ItemDataType>, TreeDragProps, FormControlPickerProps<T, PickerLocale, ItemDataType>, Pick<PickerToggleProps, 'caretAs' | 'loading'> {
    /** The height of Dropdown */
    height?: number;
    /** Tree node cascade */
    cascade?: boolean;
    /** A picker that can be counted */
    countable?: boolean;
    /** Whether display search input box */
    searchable?: boolean;
    /** Whether using virtualized list */
    virtualized?: boolean;
    /** Set the option value for the expand node */
    defaultExpandItemValues?: ItemDataType[];
    /** Set the option value for the expand node with controlled*/
    expandItemValues?: ItemDataType[];
    /** Custom render selected items */
    renderValue?: (value: T, selectedItems: ItemDataType, selectedElement: React.ReactNode) => React.ReactNode;
    /** Called when scrolling */
    onScroll?: (event: React.SyntheticEvent) => void;
}
/**
 * The `TreePicker` component is used for selecting single options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/tree-picker/
 */
declare const TreePicker: PickerComponent<TreePickerProps>;
export default TreePicker;
