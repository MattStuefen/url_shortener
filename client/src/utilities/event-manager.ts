const listeners: Record<string, ((...args) => void)[]> = {};

export const on = (event: string, func: (...args) => void) => {
    if(!Array.isArray(listeners[event]))
        listeners[event] = [];

    listeners[event].push(func);
};

export const off = (event: string, func: (...args) => void) => {
    if(!Array.isArray(listeners[event]))
        return;

    listeners[event] = listeners[event].filter(x => x !== func);
};

export const notify = (event: Events | string, ...args) => {
    if(!Array.isArray(listeners[event]))
        return;

    listeners[event].forEach(x => x(args));
};

export enum Events {
    UrlShortened = "UrlShortened"
}
