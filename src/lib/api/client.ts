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
    server: TelegramServer,
    api: TelegramConnectionParams,
    app: { storage: Storage }
}

type MTProto = (params: MTProtoParams) => (method: string) => Promise<any>;

export class TelegramAPI {
    private readonly _client: (method: string, params?: any) => Promise<any>;
    static API_ID: number;
    static API_HASH: string;

    constructor(mtpProtoImpl: MTProto, server: TelegramServer, api: TelegramConnectionParams, storage: Storage, apiHash: string) {
        this._client = mtpProtoImpl({
            server, api, app: {
                storage
            }
        });

        TelegramAPI.API_ID = api.api_id;
        TelegramAPI.API_HASH = apiHash;
    }

    call<T>(namespace: string, method: string, params?: any): Promise<T> {
        return this._client(`${namespace}.${method}`, params);
    }
}
