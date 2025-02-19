/// <reference types="node" />
import * as helpers from 'dom-lib';
export * from 'dom-lib';
/**
 * a wrapper of dom-lib with some custom methods.
 * @see https://rsuitejs.com/components/dom-helper/
 */
declare const DOMHelper: {
    isElement: (value: any) => value is HTMLElement;
    on: typeof helpers.on;
    off: typeof helpers.off;
    WheelHandler: typeof helpers.WheelHandler;
    DOMMouseMoveTracker: typeof helpers.DOMMouseMoveTracker;
    addClass: (target: Element, className: string) => Element;
    removeClass: (target: Element, className: string) => Element;
    hasClass: (target: Element, className: string) => boolean;
    toggleClass: (target: Element, className: string) => Element;
    cancelAnimationFramePolyfill: typeof cancelAnimationFrame | typeof clearTimeout;
    requestAnimationFramePolyfill: typeof requestAnimationFrame | ((callback: (t: number) => void) => NodeJS.Timeout);
    getAnimationEnd: typeof helpers.getAnimationEnd;
    ownerDocument: (node: Element | null) => Document;
    ownerWindow: (componentOrElement: Element) => Window;
    getWindow: (node: any) => Window;
    getContainer: (container: Element | (() => Element | null) | null, defaultContainer?: Element | undefined) => Element;
    canUseDOM: boolean;
    contains: (context: Element, node: Node & ParentNode) => boolean;
    scrollTop: (node: Element, val?: number | undefined) => number;
    scrollLeft: (node: Element, val?: number | undefined) => number;
    getOffset: (node: Element | null) => {
        top: number;
        left: number;
        height: number;
        width: number;
    } | DOMRect | null;
    nodeName: (node: Element) => string;
    getOffsetParent: (node: Element) => Element;
    getPosition: (node: Element, offsetParent?: Element | undefined, calcMargin?: boolean | undefined) => DOMRect | {
        top: number;
        left: number;
        height: number;
        width: number;
    } | null;
    isOverflowing: (container: Element) => boolean;
    getScrollbarSize: (recalc?: boolean | undefined) => number | void;
    getHeight: (node: Element | Window, client?: Element | undefined) => number;
    getWidth: (node: Element | Window, client?: Element | undefined) => number;
    isFocusable: typeof helpers.isFocusable;
    getStyle: (node: Element, property?: string | undefined) => string | CSSStyleDeclaration;
    removeStyle: (node: Element, keys: string | string[]) => void;
    addStyle: (node: Element, property: string | Partial<import("dom-lib/esm/addStyle").CSSProperty>, value?: string | number | undefined) => void;
    translateDOMPositionXY: (style: CSSStyleDeclaration, x?: number | undefined, y?: number | undefined) => CSSStyleDeclaration;
};
export default DOMHelper;
