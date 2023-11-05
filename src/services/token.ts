const tokenService = {
    save(name: string, token: string) {
        window.localStorage.setItem(name, token);
    },

    get(name: string) {
        return window.localStorage.getItem(name) || null;
    },

    remove(name: string) {
        window.localStorage.removeItem(name);
    },
};

export default tokenService;
