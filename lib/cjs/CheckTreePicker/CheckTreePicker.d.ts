import React from 'react';
import { PickerLocale } from '../locales';
import { PickerComponent, PickerToggleProps } from '../internals/Picker';
import { TreeBaseProps } from '../Tree/Tree';
import { FormControlPickerProps, ItemDataType } from '../@types/common';
export declare type ValueType = (string | number)[];
export interface CheckTreePickerProps<T = ValueType> extends TreeBaseProps<T, ItemDataType>, FormControlPickerProps<T, PickerLocale, ItemDataType>, Pick<PickerToggleProps, 'caretAs' | 'loading'> {
    /** Tree node cascade */
    cascade?: boolean;
    /** A picker that can be counted */
    countable?: boolean;
    /** Set the option value for the check box not to be rendered */
    uncheckableItemValues?: T;
    /** Custom render selected items */
    renderValue?: (value: any[], selectedItems: any[], selectedElement: React.ReactNode) => React.ReactNode;
    /** Called when scrolling */
    onScroll?: (event: React.SyntheticEvent) => void;
}
/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
declare const CheckTreePicker: PickerComponent<CheckTreePickerProps>;
export default CheckTreePicker;
