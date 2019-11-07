import Navigo from '../lib/router/router';
import { authStore } from '../auth';

console.log('Navigo', Navigo);
const root = '';
const useHash = true; // Defaults to: false
const hash = '#!'; // Defaults to: '#'
const router = new Navigo(root, useHash, hash);
console.log(router);

enum Routes {
    LOGIN = '/login',
    IM = '/im'
};

export function setRouting() {
    router
        .on(Routes.LOGIN,  () => {

        })

        .on(Routes.IM, () => {
            // display all the productss
            if (!authStore.isAuth) {
                router.navigate(Routes.LOGIN);
            }
        })
        .resolve();
}
