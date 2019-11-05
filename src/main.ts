import './core';
// import MTProto from 'telegram-mtproto'.default;
const MTProto = require('telegram-mtproto').default;
import * as LocalForage from 'localforage';
import { apiClient } from './core/telegram-client';
import { TelegramAPI } from './lib/api/client';

// const storage = {
//     get (key: string) { return LocalForage.getItem(key); },
//     set (key: string, value: any){ return LocalForage.setItem(key, value); },
//     remove (...keys: string[]){ return Promise.all(keys.map(key => LocalForage.removeItem(key))); },
//     clear() { return LocalForage.clear(); }
// };
//
// console.log(1111, MTProto, LocalForage);
// const phone = {
//     num : '+79126252815',
//     code: '22222'
// };
//
//
// const api = {
//     layer          : 57,
//     initConnection : 0x69796de9,
//     api_id         : 49631
// };

// const server = {
//     dev: true //We will connect to the test server.
// };           //Any empty configurations fields can just not be specified
//
// const client = MTProto({ server, api });

// async function connect(){
//     const sendCodeResponse = await client('auth.sendCode', {
//         phone_number  : phone.num,
//         current_number: false,
//         api_id        : 49631,
//         api_hash      : 'fb050b8f6771e15bfda5df2409931569',
//         type: 'auth.sentCodeTypeApp'
//     });
//
//     console.log(sendCodeResponse);
//     // @ts-ignore
//     window.onSentCode = async (code) => {
//         const { user } = await client('auth.signIn', {
//             phone_number: phone.num,
//             // phone_code_hash: sendCodeResponse.phone_code_hash,
//             phone_code: code
//         });
//
//         // const { user } = await client('auth.signUp', {
//         //     phone_number: phone.num,
//         //     phone_code_hash: sendCodeResponse.phone_code_hash,
//         //     first_name: 'Yaroslav-kakashkin',
//         //     last_name: 'Alexey-sosulkin',
//         //     phone_code: code
//         // });
//         console.log('sign user', user);
//
//
//     };
//
//
//     // @ts-ignore
//     // window.chats = async () => {
//     //     const chats = await client('contacts.getContacts');
//     //
//     //     console.log('chats', chats);
//     // };
//
//     // console.log('signed as ', user)
// }

// connect();

async function getContacts() {
    console.log('waaat?');
    const contacts = await apiClient.call<any>('contacts', 'getContacts');
    console.log('contacts', contacts);
}
//
// getContacts();

function bootstrap(): Promise<void> {
    return new Promise((resolve, reject) => {
       if (document.body) {
           resolve();
       } else {
           document.addEventListener('load', () => {
                resolve();
           });
       }
    });
}

 async function signIn(phone_number: string, phone_code_hash: string, phone_code: string) {
        const { user } = await apiClient.call('auth', 'signIn', {
            phone_number,
            phone_code_hash,
            phone_code
        });
        return user;
}

async function sentCode(phone_number: string) {
    const params = {
        phone_number,
        current_number: false,
        api_id        : TelegramAPI.API_ID,
        api_hash      : TelegramAPI.API_HASH
    };
    console.log('app id', params);
    const sendCodeResponse = await apiClient.call('auth', 'sendCode', params);
    console.log('its me', sendCodeResponse);
    return sendCodeResponse;
}

bootstrap().then(
    () => {
        const phone = document.querySelector<HTMLInputElement>('[data-app-id="phone"]');
        const code = document.querySelector<HTMLInputElement>('[data-app-id="code"]');
        const getCodeBtn = document.querySelector('[data-app-id="getCode"]');
        const signInBtn = document.querySelector('[data-app-id="signIn"]');
        const getContactsBtn = document.querySelector('[data-app-id="getContacts"]');

        let resultSentCode: any;

        getCodeBtn.addEventListener('click', async evt => {
            const phoneValue = phone.value;
            resultSentCode = await sentCode(phoneValue);
        });

        signInBtn.addEventListener('click', async evt => {
            const phoneValue = phone.value;
            const codeValue = code.value;
            const resultSignIn = await signIn(phoneValue, resultSentCode.phone_code_hash, codeValue);
            console.log('result signin', resultSignIn);
        });

        getContactsBtn.addEventListener('click', async evt => {
           getContacts();
        });
    }
);
