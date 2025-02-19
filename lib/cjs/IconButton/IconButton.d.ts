import React from 'react';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { RsRefForwardingComponent } from '../@types/common';
import Button, { ButtonProps } from '../Button';
export interface IconButtonProps extends ButtonProps {
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    /** Set circle button */
    circle?: boolean;
    /** The placement of icon */
    placement?: 'left' | 'right';
}
/**
 * The `IconButton` component is used to specify a button with icon.
 * @see https://rsuitejs.com/components/button
 */
declare const IconButton: RsRefForwardingComponent<typeof Button, IconButtonProps & {
    ref?: React.Ref<HTMLElement>;
}>;
export default IconButton;
