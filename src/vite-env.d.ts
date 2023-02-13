/// <reference types="vite/client" />

declare module 'matter-attractors';

declare namespace Matter {
    export class MousePlus extends Mouse {
        mousedown: (this: Mouse, ev: Event) => void;
        mouseup: (this: Mouse, ev: Event) => void;
        mousemove: (this: Mouse, ev: Event) => void;
        mousewheel: (this: Mouse, ev: Event) => void;
    }
}
