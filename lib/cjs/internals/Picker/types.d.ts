/// <reference types="react" />
import { RsRefForwardingComponent } from '../../@types/common';
import type { ListHandle } from '../../internals/Windowing';
export interface PickerHandle {
    root: HTMLElement | null;
    list?: ListHandle;
    overlay?: HTMLElement | null;
    target?: HTMLElement | null;
    updatePosition?: () => void;
    open?: () => void;
    close?: () => void;
}
export declare type PickerComponent<P> = RsRefForwardingComponent<'div', P & {
    ref?: React.Ref<PickerHandle>;
}>;
