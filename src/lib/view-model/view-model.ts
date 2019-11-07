import { getPath } from '../../utils/get-path';
import { createObservable } from './observable-model';

enum Selectors {
    TL_ACTION = 'tl-action',
    TL_LIST = 'tl-list',
    TL_BIND = 'tl-bind',
    TL_ID = 'tl-id'
}

export class ViewModel {
    public model: any;

    static toSelector(selectorName: Selectors) {
        return `[${selectorName}]`;
    }

    constructor(private element: Element, model: any) {
        this.model = createObservable(model);
        this.renderLists();
        this.render();
        this.handlers();
    }

    get vmElement() {
        return this.element;
    }

    handlers() {
        const list = this.element.querySelectorAll(ViewModel.toSelector(Selectors.TL_ACTION));
        if (list && list.length) {
            list.forEach(
                item => {
                    const [action, handler] = item.getAttribute(Selectors.TL_ACTION).split(':');
                    item.removeAttribute(Selectors.TL_ACTION);

                    item.addEventListener(action, (evt) => {
                        getPath(this.model, handler).call(this.model, evt);
                    });
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

    renderLists() {
        const list = this.element.querySelectorAll<HTMLElement>(ViewModel.toSelector(Selectors.TL_LIST));
        if (list && list.length) {
            list.forEach(
                item => {
                    const value = item.getAttribute(Selectors.TL_LIST);
                    const [controls, keyValue] = value.split(';').map(v => v.trim());
                    const [listItem, listPath] = controls.split(' of ');
                    const key = keyValue ? keyValue.split(':')[1].trim() : null;
                    const commentNode = document.createComment(`${Selectors.TL_LIST}: ${controls}`);
                    item.removeAttribute(Selectors.TL_LIST);
                    const itemToRepeat = item.cloneNode(true) as HTMLElement;

                    this.renderList(commentNode, itemToRepeat, listPath, listItem, key);
                    item.replaceWith(commentNode);
                }
            );
        }
    }

    renderList(appendNode: Node, element: Node, listPath: string, itemName: string, key: string) {
        const insertNode = (elem: Element) => {
            setTimeout(() => appendNode.parentNode.insertBefore(elem, appendNode));
        };
        let rendered: ViewModel[] = [];
        this.model.$onChange(listPath, (arr: any[]) => {
            let item: any;

            for (let i = 0, l = arr.length; i < l; i++) {
                item = arr[i];

                if (key && rendered[i] && item[key] === rendered[i].model.item[key]) continue;

                if (rendered[i]) {
                    const rest = rendered.splice(i, rendered.length - i);
                    rest.forEach(v => v.destroy());
                }

                const itemElement = element.cloneNode(true) as HTMLElement;
                itemElement.setAttribute(Selectors.TL_ID, item.id);
                const newModel = Object.create(this.model);
                newModel[itemName] = item;
                const vm = new ViewModel(itemElement, newModel);
                insertNode(vm.vmElement);
                rendered.push(vm);
            }

            if (rendered.length > arr.length) {
                const last = rendered.splice(arr.length, rendered.length - arr.length);
                last.forEach(vm => vm.destroy());
            }
        });
    }

    render() {
        const list = this.element.querySelectorAll(ViewModel.toSelector(Selectors.TL_BIND));
        if (list && list.length) {
            list.forEach(
                item => {
                    const path = item.getAttribute(Selectors.TL_BIND);
                    item.removeAttribute(Selectors.TL_BIND);
                    this.model.$onChange(path, (value: any) => {
                        item.innerHTML = value;
                    });
                }
            );
        }
    }

    destroy() {
        this.model.$destroy();
        this.element.remove();
    }
}
