import { ViewModel } from '../view-model/view-model';

export class PageViewManager {
    private _views = new Map<string, ViewModel>();
    rootElement: Element;
    ready: Promise<void>;
    constructor(private rootId = 'root') {
        this._ready();
    }

    private _ready() {
        this.ready = new Promise((resolve, reject) => {
            if (document.body) {
                this.rootElement = document.querySelector(`#${this.rootId}`);
                resolve();
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    this.rootElement = document.querySelector(`${this.rootId}`);
                    resolve();
                });
            }
        });
    }

    addView(name: string, view: ViewModel) {
        this._views.set(name, view);
    }

    change(name: string) {
        const view = this._views.get(name);
        if (!view) {
            console.warn(`Add view ${name} for change`);
            return;
        }

        this.rootElement.innerHTML = '';

        view.mountTo(this.rootElement);
    }
}
