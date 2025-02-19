import React from 'react';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
export interface TableCellProps extends WithAsProps {
    date: Date;
    disabled?: boolean;
    selected?: boolean;
    unSameMonth?: boolean;
    rangeStart?: boolean;
    rangeEnd?: boolean;
    inRange?: boolean;
    onSelect?: (date: Date, disabled: boolean | void, event: React.MouseEvent) => void;
}
declare const TableCell: RsRefForwardingComponent<'div', TableCellProps>;
export default TableCell;
