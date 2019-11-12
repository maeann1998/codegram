import { getPath } from '../../utils/get-path';

type HandlerFn = (value: any) => void;

export function createObservable(input: any) {
    let observableObject = input;
    let handlers: Record<string, HandlerFn[]> = {};
    const addSetter = (obj: any, path: string) => {
        if (handlers[path]) return true;
        const splitted = path.split('.');

        while (splitted.length !== 1) {
            const newObj = obj[splitted.shift()];
            if (typeof newObj !== 'object' || Array.isArray(newObj) || newObj === null) {
                console.warn(`Cannot find path in model: ${path}`);
                return false;
            }
            obj = newObj;
        }

        const lastKey = splitted.pop();
        let _value: any = obj[lastKey];
        handlers[path] = [];
        Object.defineProperty(obj, lastKey, {
            get() {
                return _value;
            },
            set(value: any) {
                if (value === _value) return;
                _value = value;
                handlers[path].forEach(fn => fn(value));
            },
            enumerable: true
        });

        return true;
    };

    observableObject.$onChange = (path: string, handler: HandlerFn) => {
        const isAdded = addSetter(observableObject, path);

        if (!isAdded) return;

        const val = getPath(observableObject, path);

        if (val === undefined) {
            console.warn(`Cannot find path: ${path}`);
            return;
        }

        handler(val);
        handlers[path].push(handler);
    };

    observableObject.$destroy = () => {
        handlers = null;
    };

    return observableObject;
}
