import { router } from '../core/routing';

export class AuthViewModel {
    login() {
        router.navigate('/im');
    }
}
