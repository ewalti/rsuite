import React from 'react';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
export interface MessageProps extends WithAsProps {
    /** The type of the message box. */
    type?: TypeAttributes.Status;
    /** Whether it is possible to close the message box */
    closable?: boolean;
    /**
     * Delay automatic removal of messages.
     * When set to 0, the message is not automatically removed.
     * (Unit: milliseconds)
     *
     * @default 2000
     * @deprecated Use `toaster.push(<Message />, { duration: 2000 })` instead.
     *
     */
    duration?: number;
    /** The title of the message  */
    header?: React.ReactNode;
    /** Whether to display an icon */
    showIcon?: boolean;
    /** Fill the container */
    full?: boolean;
    /** Callback after the message is removed */
    onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}
/**
 * The `Message` component is used to display important messages to users.
 * @see https://rsuitejs.com/components/message
 */
declare const Message: RsRefForwardingComponent<'div', MessageProps>;
export default Message;
