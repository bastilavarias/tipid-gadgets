const pageMixin = {
    methods: {
        savePageData(name, data) {
            window.localStorage.setItem(
                `page-data-${name}`,
                JSON.stringify(data)
            );
        },

        retrievePageData(name) {
            return JSON.parse(window.localStorage.getItem(`page-data-${name}`));
        },

        deletePageData(name) {
            window.localStorage.removeItem(`page-data-${name}`);
        },
    },
};

export default pageMixin;
