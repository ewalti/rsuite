import { VariableSizeList, ListItemKeySelector, ListOnScrollProps, ListOnItemsRenderedProps } from 'react-window';
import { WithAsProps, RsRefForwardingComponent } from '../../@types/common';
export interface ListProps<T = any> extends WithAsProps {
    /**
     * @deprecated use itemSize instead
     * Either a fixed row height (number) or a function that returns the height of a row given its index: ({ index: number }): number
     */
    rowHeight?: number | (({ index }: {
        index: any;
    }) => number);
    /**
     * Size of a item in the direction being windowed.
     */
    itemSize: number | ((index: number) => number);
    /**
     * Scroll offset for initial render.
     */
    initialScrollOffset?: number;
    /**
     * By default, lists will use an item's index as its key. This is okay if:
     *
     * - Your collections of items is never sorted or modified
     * - Your item renderer is not stateful and does not extend PureComponent
     *
     * If your list does not satisfy the above constraints, use the itemKey property to specify your own keys for items
     */
    itemKey?: ListItemKeySelector<T>;
    /**
     * Called when the items rendered by the list change.
     */
    onItemsRendered?: (props: ListOnItemsRenderedProps) => void;
    /**
     * Called when the list scroll positions changes, as a result of user scrolling or scroll-to method calls.
     */
    onScroll?: (props: ListOnScrollProps) => void;
}
export interface ListHandle extends Partial<VariableSizeList> {
    /**
     * @deprecated use scrollToItem instead
     * Ensure row is visible. This method can be used to safely scroll back to a cell that a user has scrolled away from even if it was previously scrolled to.
     */
    scrollToRow?: (index: number) => void;
}
/**
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 *
 * @private
 */
declare const List: RsRefForwardingComponent<'div', ListProps>;
export default List;
