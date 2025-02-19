import React from 'react';
import { WithAsProps } from '../@types/common';
import { Collection } from './helper/useManager';
export interface ListItemProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
    index?: number;
    collection?: Collection;
    disabled?: boolean;
    size?: 'lg' | 'md' | 'sm';
}
/**
 * The `List.Item` component is used to specify the layout of the list item.
 * @see https://rsuitejs.com/components/list
 */
declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLDivElement>>;
export default ListItem;
