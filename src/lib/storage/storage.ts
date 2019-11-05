import * as LocalForage from "localforage";
import { Storage } from './storage.model';

export const storage: Storage = {
    get(key: string) {
        return LocalForage.getItem(key);
    },
    set(key: string, value: any) {
        return LocalForage.setItem(key, value);
    },
    remove(...keys: string[]) {
        return Promise.all(keys.map(key => LocalForage.removeItem(key))).then(() => void 0);
    },
    clear() {
        return LocalForage.clear();
    }
};

