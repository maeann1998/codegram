interface NavigoHooks {
    before?: ((done: () => void) => void);
    after?: () => void;
}
type Route = string | RegExp;

declare class Navigo {

    /**
     * Constructs the router
     * @param root The main URL of your application.
     * @param hash Hash symbol.
     * @param useHash If useHash set to true then the router uses an old routing approach with hash in the URL. Navigo anyways falls back to this mode if there is no History API supported.
     */
    constructor(root?: string, useHash?: boolean, hash?: string);


    on(location: Route, handler: (...parameters: string[]) => void): Navigo;
    on(routes: { [key: string]: (...parameters: string[]) => void }): Navigo;
    on(handler: (...parameters: string[]) => void): Navigo;
    notFound(handler: ((query: string) => void)): void;
    navigate(path: string, absolute?: boolean): void;
    updatePageLinks(): void;
    generate(path: string, params?: any): string;
    resolve(currentURL?: string): void;

    link(path: string): string;

    disableIfAPINotAvailable(): void;

    pause(): void;
    resume(): void;

    destroy(): void;
}
export = Navigo;
export as namespace Navigo;
