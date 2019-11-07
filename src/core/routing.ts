import Navigo from '../lib/router/router';
import { authStore } from '../auth';
import { viewManager } from './'

const root = '';
const useHash = true; // Defaults to: false
const hash = '#!'; // Defaults to: '#'
export const router = new Navigo(root, useHash, hash);

enum Routes {
    LOGIN = '/login',
    IM = '/im'
}

export function setRouting() {
    router
        .on(Routes.LOGIN,  () => {
            viewManager.change('login');
        })

        .on(Routes.IM, () => {
            // display all the productss
            // if (!authStore.isAuth) {
            //     return router.navigate(Routes.LOGIN);
            // }

            viewManager.change('im');
        })
        .resolve();
}
