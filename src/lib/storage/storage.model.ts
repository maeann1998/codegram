export interface Storage {
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    remove(...keys: string[]): Promise<void>;
    clear(): Promise<void>;
}
