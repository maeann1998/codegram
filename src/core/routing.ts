import Navigo from '../lib/router/router';

const root = '';
const useHash = true; // Defaults to: false
const hash = '#!'; // Defaults to: '#'
const router = new Navigo(root, useHash, hash);

router
    .on('/auth',  () => {
        // display all the productss
        console.log('render auth', this);
    })

    .on('/im', () => {
        // display all the productss
        console.log('render im');
    })
    .resolve();

setTimeout(() => {
    console.log('auth');
    router.navigate('/auth');

    setTimeout(() => {
        console.log('im');
        router.navigate('/im');
    }, 2000);
}, 2000);
