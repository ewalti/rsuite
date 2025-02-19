import React from 'react';
import { PickerLocale } from '../locales';
import { PickerHandle, PickerToggleProps } from '../internals/Picker';
import { ItemDataType, FormControlPickerProps } from '../@types/common';
import type { MultipleSelectProps } from '../SelectPicker';
export declare type ValueType = (number | string)[];
export interface CheckPickerProps<T> extends FormControlPickerProps<T[], PickerLocale, ItemDataType<T>>, MultipleSelectProps<T>, Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
    /** Top the selected option in the options */
    sticky?: boolean;
    /** A picker that can be counted */
    countable?: boolean;
}
export interface CheckPickerComponent {
    <T>(props: CheckPickerProps<T> & {
        ref?: React.Ref<PickerHandle>;
    }): JSX.Element | null;
    displayName?: string;
    propTypes?: React.WeakValidationMap<CheckPickerProps<any>>;
}
/**
 * A component for selecting checkable items in a dropdown list.
 * @see https://rsuitejs.com/components/check-picker
 */
declare const CheckPicker: CheckPickerComponent;
export default CheckPicker;
