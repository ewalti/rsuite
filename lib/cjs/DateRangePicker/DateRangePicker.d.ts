import React from 'react';
import { FormControlBaseProps, PickerBaseProps } from '../@types/common';
import { DateRangePickerLocale } from '../locales';
import { PickerComponent } from '../internals/Picker';
import { DisabledDateFunction, RangeType, DateRange } from './types';
export interface DateRangePickerProps extends PickerBaseProps<DateRangePickerLocale>, FormControlBaseProps<DateRange | null> {
    /** Custom caret component */
    caretAs?: React.ElementType | null;
    /** Predefined date ranges */
    ranges?: RangeType[];
    /** Custom cell classes base on it's date */
    cellClassName?: (date: Date) => string | undefined;
    /** Custom rendering cell*/
    renderCell?: (date: Date) => React.ReactNode;
    /** Format date */
    format?: string;
    /** Rendered as an input, the date can be entered via the keyboard */
    editable?: boolean;
    /** The date range that will be selected when you click on the date */
    hoverRange?: 'week' | 'month' | ((date: Date) => DateRange);
    /** Whether to click once on selected date range，Can be used with hoverRange */
    oneTap?: boolean;
    /**
     * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
     *
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     */
    isoWeek?: boolean;
    /** A label displayed at the beginning of toggle button */
    label?: React.ReactNode;
    /** Set the upper limit of the available year relative to the current selection date */
    limitEndYear?: number;
    /** Set the lower limit of the available year relative to the current selection date */
    limitStartYear?: number;
    /** Whether to display a loading state indicator */
    loading?: boolean;
    /** Whether to show week numbers */
    showWeekNumbers?: boolean;
    /** Show only one calendar select */
    showOneCalendar?: boolean;
    /** Meridian format */
    showMeridian?: boolean;
    /** Set default date for calendar */
    defaultCalendarValue?: DateRange;
    /** The character that separates two dates */
    character?: string;
    /**
     * Disabled date
     *
     * @deprecated Use {@link shouldDisableDate} instead
     */
    disabledDate?: DisabledDateFunction;
    /**
     * Whether a date cell is disabled
     */
    shouldDisableDate?: DisabledDateFunction;
    /** Called when the option is selected */
    onSelect?: (date: Date, event?: React.SyntheticEvent) => void;
    /** Called after clicking the OK button */
    onOk?: (date: DateRange, event: React.SyntheticEvent) => void;
    /** Called after clicking the shortcut button */
    onShortcutClick?: (range: RangeType, event: React.MouseEvent) => void;
    /** Called when clean */
    onClean?: (event: React.MouseEvent) => void;
    /**
     * Custom render value
     * @deprecated
     */
    renderValue?: (value: DateRange, format: string) => React.ReactNode;
    /** Custom render for calendar title */
    renderTitle?: (date: Date) => React.ReactNode;
}
export interface DateRangePicker extends PickerComponent<DateRangePickerProps> {
    /** Allow the maximum number of days specified, other dates are disabled */
    allowedMaxDays?: (days: number) => DisabledDateFunction;
    /** Only allowed days are specified, other dates are disabled */
    allowedDays?: (days: number) => DisabledDateFunction;
    /** Allow specified date range, other dates are disabled */
    allowedRange?: (startDate: string | Date, endDate: string | Date) => DisabledDateFunction;
    /** Disable dates after the specified date */
    before?: (beforeDate: string | Date) => DisabledDateFunction;
    /** Disable dates before the specified date */
    after?: (afterDate: string | Date) => DisabledDateFunction;
    /** Disable dates after today. */
    beforeToday?: () => DisabledDateFunction;
    /** Disable dates before today */
    afterToday?: () => DisabledDateFunction;
    /** Used to combine multiple conditions */
    combine?: (...args: any) => DisabledDateFunction;
}
/**
 * A date range picker allows you to select a date range from a calendar.
 *
 * @see https://rsuitejs.com/components/date-range-picker
 */
declare const DateRangePicker: DateRangePicker;
export default DateRangePicker;
