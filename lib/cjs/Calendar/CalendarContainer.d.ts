import React, { HTMLAttributes } from 'react';
import { CalendarHeaderProps } from './CalendarHeader';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { CalendarLocale } from '../locales';
import { CalendarState } from './useCalendarState';
export interface CalendarProps extends WithAsProps, Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange' | 'onMouseMove'>, CalendarHeaderProps {
    /** The panel render based on date range */
    dateRange?: Date[];
    /** The Id of the target element that triggers the opening of the calendar */
    targetId?: string;
    /** Date displayed on the current page */
    calendarDate: Date;
    /** Whether to show week numbers */
    showWeekNumbers?: boolean;
    inline?: boolean;
    defaultState?: CalendarState;
    /** Disabled date */
    disabledDate?: (date: Date) => boolean;
    /** Disabled hours */
    disabledHours?: (hour: number, date: Date) => boolean;
    /** Disabled minutes */
    disabledMinutes?: (minute: number, date: Date) => boolean;
    /** Hidden seconds */
    disabledSeconds?: (second: number, date: Date) => boolean;
    /** Format str */
    format: string;
    /** Hidden hours */
    hideHours?: (hour: number, date: Date) => boolean;
    /** Hidden minutes */
    hideMinutes?: (minute: number, date: Date) => boolean;
    /** Hidden seconds */
    hideSeconds?: (second: number, date: Date) => boolean;
    /** The value that mouse hover on in range selection */
    hoverRangeValue?: [Date, Date];
    /**
     * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
     *
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     */
    isoWeek?: boolean;
    /** Limit showing how many years in the future */
    limitEndYear?: number;
    /** Limit showing how many years in the past */
    limitStartYear?: number;
    /** Custom locale */
    locale: CalendarLocale;
    /** Callback after the date has changed */
    onChangeMonth?: (nextPageDate: Date, event: React.MouseEvent) => void;
    /** Callback after the time has changed */
    onChangeTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
    /** Callback after mouse enter other date cell */
    onMouseMove?: (date: Date) => void;
    /** Switch to the callback triggered after the previous month. */
    onMoveBackward?: (nextPageDate: Date) => void;
    /** Switch to the callback triggered after the next month. */
    onMoveForward?: (nextPageDate: Date) => void;
    /** Callback fired before the date selected */
    onSelect?: (date: Date, event: React.MouseEvent) => void;
    /** Custom rendering cell*/
    renderCell?: (date: Date) => React.ReactNode;
    /** Custom cell classes base on it's date */
    cellClassName?: (date: Date) => string | undefined;
    /** Called when opening the month view */
    onToggleMonthDropdown?: (toggle: boolean) => void;
    /** Called when opening the time view */
    onToggleTimeDropdown?: (toggle: boolean) => void;
}
declare const CalendarContainer: RsRefForwardingComponent<'div', CalendarProps>;
export default CalendarContainer;
