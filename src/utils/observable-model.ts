import { getPath } from './get-path';

type HandlerFn = (value: any) => void;

export function createObservable(input: any) {
    const handlers: Record<string, HandlerFn[]> = {};
    const processObject = (obj: any, path: string[] = []) => {
        for (let key in obj) {
            let _value: any = obj[key];
            if (typeof _value === 'function') {
                obj[key] = _value;
            } else if (typeof _value === 'object' && !Array.isArray(_value) && _value !== null) {
                path.push(key);
                processObject(_value, path);
                path.pop();
            } else {
                const hKey = path.length ? path.concat(key).join('.') : key;
                handlers[hKey] = [];
                Object.defineProperty(obj, key, {
                    get() {
                        return _value;
                    },
                    set(value: any) {
                        if (value === _value) return;
                        _value = value;
                        handlers[hKey].forEach(fn => fn(value));
                    },
                    enumerable: true
                });
            }
        }
        return obj;
    };

    let observableObject = processObject(input);

    observableObject.$onChange = (path: string, handler: HandlerFn) => {
        handler(getPath(observableObject, path));
        handlers[path].push(handler);
    };

    observableObject.$destroy = () => {
        handlers = null;
    };

    return observableObject;
}
