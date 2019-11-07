class AuthStore {
    static createStore() {
        return new AuthStore();
    }

    isAuth = false;

    login() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 2000);
        }).then(
            () => this.isAuth = true
        )
    }

    logout() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 10000);
        });
    }

}

export const authStore = AuthStore.createStore();
