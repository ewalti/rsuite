import React from 'react';
import { PickerLocale } from '../locales';
import { PickerHandle, PickerToggleProps } from '../internals/Picker';
import { ItemDataType, FormControlPickerProps } from '../@types/common';
export declare type ValueType = number | string;
export interface CascaderProps<T = ValueType> extends FormControlPickerProps<T | null, PickerLocale, ItemDataType<T>>, Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
    /** Sets the width of the menu */
    menuWidth?: number;
    /** Sets the height of the menu */
    menuHeight?: number | string;
    /** Whether dispaly search input box */
    searchable?: boolean;
    /** The menu is displayed directly when the component is initialized */
    inline?: boolean;
    /** When true, make the parent node selectable */
    parentSelectable?: boolean;
    /** Custom render menu */
    renderMenu?: (items: readonly ItemDataType[], menu: React.ReactNode, parentNode?: any, layer?: number) => React.ReactNode;
    /** Custom render menu items */
    renderMenuItem?: (itemLabel: React.ReactNode, item: ItemDataType) => React.ReactNode;
    /** Custom render search items */
    renderSearchItem?: (itemLabel: React.ReactNode, items: ItemDataType[]) => React.ReactNode;
    /** Custom render selected items */
    renderValue?: (value: T, selectedPaths: ItemDataType[], selectedElement: React.ReactNode) => React.ReactNode;
    /** Called when the option is selected */
    onSelect?: (value: ItemDataType, selectedPaths: ItemDataType[], event: React.SyntheticEvent) => void;
    /** Called when clean */
    onClean?: (event: React.SyntheticEvent) => void;
    /** Called when searching */
    onSearch?: (searchKeyword: string, event: React.SyntheticEvent) => void;
    /** Asynchronously load the children of the tree node. */
    getChildren?: (node: ItemDataType<T>) => ItemDataType<T>[] | Promise<ItemDataType<T>[]>;
}
export interface CascaderComponent {
    <T>(props: CascaderProps<T> & {
        ref?: React.Ref<PickerHandle>;
    }): JSX.Element | null;
    displayName?: string;
    propTypes?: React.WeakValidationMap<CascaderProps<any>>;
}
/**
 * The `Cascader` component displays a hierarchical list of options.
 * @see https://rsuitejs.com/components/cascader
 */
declare const Cascader: CascaderComponent;
export default Cascader;
