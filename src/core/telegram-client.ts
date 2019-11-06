import { TelegramAPI } from '../lib/api/client';
import { storage } from '../lib/storage';

const MTProto = require('telegram-mtproto').default;
import * as LocalForage from 'localforage';

const api = {
    layer: 74,
    initConnection: 0xc7481da6,
    invokeWithLayer: 0xda9b0d0d,
    // api_id: 49631
    api_id: 1194503
};

const server = {
    dev: true,
    webogram: true,
    // dcList: [{
    //     id: 1,
    //     host: 'https://149.154.167.40',
    //     port: 443
    // }]
};

const API_HASH = '5ac6c0763d8420ed685b738e59fd5e86';
// const API_HASH = 'fb050b8f6771e15bfda5df2409931569';

// @ts-igo
export const apiClient = new TelegramAPI(MTProto, server, api, storage, API_HASH);

