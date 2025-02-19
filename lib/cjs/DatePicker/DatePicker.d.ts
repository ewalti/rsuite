import React from 'react';
import { RangeType } from './Toolbar';
import { DatePickerLocale } from '../locales';
import { FormControlBaseProps, PickerBaseProps, RsRefForwardingComponent } from '../@types/common';
export type { RangeType } from './Toolbar';
export interface DatePickerProps extends PickerBaseProps<DatePickerLocale>, FormControlBaseProps<Date | null> {
    /** Custom caret component */
    caretAs?: React.ElementType | null;
    /** Custom cell classes base on it's date */
    cellClassName?: (date: Date) => string | undefined;
    /** Calendar panel default presentation date and time */
    calendarDefaultDate?: Date;
    /** Whether disabled the component */
    disabled?: boolean;
    /** Rendered as an input, the date can be entered via the keyboard */
    editable?: boolean;
    /** Format date */
    format?: string;
    /**
     * Display date panel when component initial
     *
     * @deprecated use <Calendar> instead
     **/
    inline?: boolean;
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
    /** one tap to select */
    oneTap?: boolean;
    /** Whether plaintext the component */
    plaintext?: boolean;
    /** Whether read only the component */
    readOnly?: boolean;
    /** Custom rendering cell*/
    renderCell?: (date: Date) => React.ReactNode;
    /** Predefined date Ranges */
    ranges?: RangeType<Date>[];
    /** Whether to show week numbers */
    showWeekNumbers?: boolean;
    /** Meridian format */
    showMeridian?: boolean;
    /**
     * Whether to disable a date on the calendar view
     *
     * @returns date should be disabled (not selectable)
     * @deprecated Use {@link shouldDisableDate} instead
     */
    disabledDate?: (date?: Date) => boolean;
    /**
     * Disabled hours
     *
     * @deprecated Use {@link shouldDisableHour} instead
     */
    disabledHours?: (hour: number, date: Date) => boolean;
    /**
     * Disabled minutes
     *
     * @deprecated Use {@link shouldDisableMinute} instead
     */
    disabledMinutes?: (minute: number, date: Date) => boolean;
    /**
     * Disabled seconds
     *
     * @deprecated Use {@link shouldDisableSecond} instead
     */
    disabledSeconds?: (second: number, date: Date) => boolean;
    /**
     * Whether a date on the calendar view should be disabled
     *
     * @returns date should be disabled (not selectable)
     */
    shouldDisableDate?: (date: Date) => boolean;
    /**
     * Disabled hours
     */
    shouldDisableHour?: (hour: number, date: Date) => boolean;
    /**
     * Disabled minutes
     */
    shouldDisableMinute?: (minute: number, date: Date) => boolean;
    /**
     * Disabled seconds
     */
    shouldDisableSecond?: (second: number, date: Date) => boolean;
    /** Hidden hours */
    hideHours?: (hour: number, date: Date) => boolean;
    /** Hidden minutes */
    hideMinutes?: (minute: number, date: Date) => boolean;
    /** Hidden seconds */
    hideSeconds?: (second: number, date: Date) => boolean;
    /** Called when the calendar panel date changes */
    onChangeCalendarDate?: (date: Date, event?: React.SyntheticEvent) => void;
    /** Called when opening the month view */
    onToggleMonthDropdown?: (toggle: boolean) => void;
    /** Called when opening the time view */
    onToggleTimeDropdown?: (toggle: boolean) => void;
    /** Called when the option is selected */
    onSelect?: (date: Date, event?: React.SyntheticEvent) => void;
    /** Called after the prev month */
    onPrevMonth?: (date: Date) => void;
    /** Called after the next month */
    onNextMonth?: (date: Date) => void;
    /** Called after clicking the OK button */
    onOk?: (date: Date, event: React.SyntheticEvent) => void;
    /** Called after clicking the shortcut button */
    onShortcutClick?: (range: RangeType<Date>, event: React.MouseEvent) => void;
    /** Called when clean */
    onClean?: (event: React.MouseEvent) => void;
    /**
     * @deprecated
     */
    renderValue?: (value: Date, format: string) => string;
}
/**
 * A date picker allows users to select a date from a calendar.
 *
 * @see https://rsuitejs.com/components/date-picker
 */
declare const DatePicker: RsRefForwardingComponent<'div', DatePickerProps>;
export default DatePicker;
