import './core';
// import MTProto from 'telegram-mtproto'.default;
const MTProto = require('telegram-mtproto').default;
import * as LocalForage from 'localforage';
import { apiClient } from './core/telegram-client';
import { TelegramAPI } from './lib/api/client';

// @ts-ignore
window.tltl = apiClient;

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

async function signUp(phone_number: string, phone_code_hash: string, phone_code: string) {
    const { user } = await apiClient.call('auth', 'signUp', {
        phone_number,
        phone_code_hash,
        phone_code,
        first_name: 'Saska',
        last_name: 'Bobrov'
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
        const signUpBtn = document.querySelector('[data-app-id="signUp"]');

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

        signUpBtn.addEventListener('click', async evt => {
            const phoneValue = phone.value;
            const codeValue = code.value;
            console.log('code value', codeValue);
            resultSentCode = await signUp(phoneValue, resultSentCode.phone_code_hash, codeValue);
        });
    }
);


// function Component(
//     template: string,
//     controller: () => void,
// ) {
//

//     const _controller = new SimpleComponent();
//     const element = htmlToElement(template);
//
//     console.log('eleement', element, _controller);
//     // console.log('require', require);
//     // const template = import(templateUrl);
//     // console.log('template', template);
// }
//
//
// class SimpleComponent {
//     user = 1;
//     constructor() {
//
//     }
// }
//
//
// Component(html, SimpleComponent);

const html = require('./render.html');

// function htmlToElement(html: string): Element {
//     console.log('html', html);
//     const template = document.createElement('template');// Never return a text node of whitespace as the result
//     template.innerHTML = html;
//     // @ts-ignore
//     return template;
// }

function htmlToElement(htmlString: string): Element {
    const div = document.createElement('div');
    console.log('2222', htmlString.trim());
    div.innerHTML = htmlString;
    console.log('3333', div);

    // Change this to div.childNodes to support multiple top-level nodes
    // @ts-ignore
    return div.firstChild;
}

function observable(input: any, notify: () => void) {
    return new Proxy(input, {
        set: (target, property, value) => {
            target[property] = value;
            notify();
            return true;
        }
    });
}

function get(obj: any, path: string) {
    let paths = path.split('.')
        , current = obj
        , i;
    for (i = 0; i < paths.length; ++i) {
        if (current[paths[i]] == undefined) {
            return undefined;
        } else {
            current = current[paths[i]];
        }
    }
    return current;
}

class ViewModel {
    public model: any;
    constructor(private element: Element, model: any) {
        this.model = observable(model, this.notify.bind(this));
        this.render();
        this.handlers();
    }

    notify() {
        this.render();
    }

    handlers() {
        const list = this.element.querySelectorAll('[tl-action]');
        if (list && list.length) {
            list.forEach(
                item => {
                    const [action, handler] = item.getAttribute('tl-action').split(':');

                    item.addEventListener(action, (evt) => {
                        get(this.model, handler).call(this.model, evt);
                    })
                }
            );
        }
    }

    mountTo(element: Element | string) {
        if (typeof element === 'string') {
            const dest = document.body.querySelector(element);
            if (dest) {
                dest.append(this.element);
            }
        } else {
            element.append(this.element);
        }
    }

    render() {
        const list = this.element.querySelectorAll('[tl-bind]');
        if (list && list.length) {
            list.forEach(
                item => {
                    const path = item.getAttribute('tl-bind');
                    item.innerHTML = get(this.model, path);
                }
            );
        }
    }
}

class SomeComponent {
    title = 'Hello';
    user = { name: 'Alexey' };

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

vm.mountTo(document.body);
