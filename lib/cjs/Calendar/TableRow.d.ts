import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
export interface TableRowProps extends WithAsProps {
    weekendDate?: Date;
    rowIndex?: number;
}
declare const TableRow: RsRefForwardingComponent<'div', TableRowProps>;
export default TableRow;
