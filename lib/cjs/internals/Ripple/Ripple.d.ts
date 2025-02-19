import React from 'react';
import { WithAsProps } from '../../@types/common';
export interface RippleProps extends WithAsProps {
    onMouseDown?: (position: any, event: React.MouseEvent) => void;
}
/**
 * The `Ripple` component is used to implement the ripple effect.
 * @private
 */
declare const Ripple: React.ForwardRefExoticComponent<RippleProps & React.RefAttributes<HTMLSpanElement>>;
export default Ripple;
