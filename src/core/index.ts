import {  setRouting } from './routing';
import { PageViewManager } from '../lib/view-manager/view-manager';


export const viewManager = new PageViewManager('root');

viewManager.ready.then(() => {
    console.log('viewman', viewManager);
    setRouting();
});

