const tokenService = {
    save(name, token) {
        window.localStorage.setItem(name, token);
    },

    get(name) {
        return window.localStorage.getItem(name) || null;
    },

    remove(name) {
        window.localStorage.removeItem(name);
    },
};

export default tokenService;
