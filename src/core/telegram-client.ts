import { TelegramAPI } from '../lib/api/client';
import { storage } from '../lib/storage';

const MTProto = require('telegram-mtproto').default;
import * as LocalForage from 'localforage';

const api = {
    layer: 57,
    initConnection: 0x69796de9,
    api_id: 49631
};


const server = {
    dev: true
};

const API_HASH = 'fb050b8f6771e15bfda5df2409931569';

// @ts-igo
export const apiClient = new TelegramAPI(MTProto, server, api, storage, API_HASH);

