import { router } from '../core/routing';

export class ImViewModel {
    logout() {
        router.navigate('/login');
    }
}
