import './core';
import * as LocalForage from 'localforage';
// import { TelegramAPI } from './lib/api/client';
import { ViewModel } from './lib/view-model/view-model';
import { htmlToElement } from './utils/string-to-html';
// import { bytesToHex } from './lib/mtproto/bin_utils';
// @ts-ignore

const html = require('./render.html');

class SomeComponent {
    private i = 0;
    title = 'Hello';
    user = { name: 'Alexey' };
    elements: any = [{name: 'Puska', id: this.i++}];

    addElem() {
        const list = this.elements.slice();
        list.push({name: `Piska ${this.i}`, id: this.i++});
        this.elements = list;
    }

    removeElem() {
        const list = this.elements.slice();
        list.pop();
        this.elements = list;
    }

    onCounterPlus() {
        this.title = 'Pidor';
    }

    onChangeInput(evt: KeyboardEvent) {
        this.title = (evt.target as HTMLInputElement).value;
    }

    onBlurInput() {
        this.title = 'OGROMNIY ANUS LEXI';
    }
}

const model = new SomeComponent();


const vm = new ViewModel(htmlToElement(html), model);


// vm.mountTo(document.body);
// @ts-ignore
const ContainerModule = require('ioc-js');
// console.log('inv', inv);
// @ts-ignore
window.ContainerModule = ContainerModule;
// @ts-ignore
// window.jQuery =
// @ts-ignore
window.jQuery = window.$ = require('jquery');

// @ts-ignore

// @ts-ignore
window.Rusha = require('rusha');
// @ts-ignore
window.$(window).on('click keydown', () => {
    console.log('pidor');
});

import { str2bigInt } from './lib/mtproto/libs/leemon/leemon';
// @ts-ignore
window.str2bigInt = str2bigInt;

import 'lib/mtproto/libs/api-lib';
// @ts-ignore
window.telegramApi.setConfig({
    app: {
        id: 1194503, /* App ID */
        hash: '5ac6c0763d8420ed685b738e59fd5e86', /* App hash */
        version: '0.0.0' /* App version */
    },
    server: {
        test: [
            {
                id: 2, /* DC ID */
                host: '149.154.167.40',
                port: 443
            }
        ],
        production: [
            {
                id: 2, /* DC ID */
                host: '0.0.0.0',
                port: 123
            }
        ]
    }
});

// @ts-ignore
window.telegramApi.sendCode('+79126252815').then(res => {
   console.log('res', res);
}).catch((err: any) => {
    console.error(err);
});
