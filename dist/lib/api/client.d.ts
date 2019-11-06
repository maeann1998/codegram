import { Storage } from '../storage';
interface TelegramServer {
    dev: boolean;
}
interface TelegramConnectionParams {
    layer: number;
    initConnection: number;
    api_id: number;
}
interface MTProtoParams {
    server: TelegramServer;
    api: TelegramConnectionParams;
    app: {
        storage: Storage;
    };
}
declare type MTProto = (params: MTProtoParams) => (method: string) => Promise<any>;
export declare class TelegramAPI {
    private readonly _client;
    static API_ID: number;
    static API_HASH: string;
    constructor(mtpProtoImpl: MTProto, server: TelegramServer, api: TelegramConnectionParams, storage: Storage, apiHash: string);
    call<T>(namespace: string, method: string, params?: any): Promise<T>;
}
export {};
