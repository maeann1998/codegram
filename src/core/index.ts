import {  setRouting } from './routing';
import { PageViewManager } from '../lib/view-manager/view-manager';
import { authViewModel } from '../auth/auth.component';
import { imViewModel } from '../im';


export const viewManager = new PageViewManager('root');

viewManager.ready.then(() => {
    console.log('viewman', viewManager);
    viewManager.addView('login', authViewModel);
    viewManager.addView('im', imViewModel);
    setRouting();
});

