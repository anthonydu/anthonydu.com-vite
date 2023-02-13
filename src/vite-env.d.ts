/// <reference types="vite/client" />

declare module 'matter-attractors';

declare namespace Matter {
    export class MousePlus extends Mouse {
        mousedown: (this: HTMLElement, ev: TouchEvent | MouseEvent) => void;
        mouseup: (this: HTMLElement, ev: TouchEvent | MouseEvent) => void;
        mousemove: (this: HTMLElement, ev: TouchEvent | MouseEvent) => void;
        mousewheel: (this: HTMLElement, ev: MouseWheelEvent) => void;
    }
}
