const redirectionMixin = {
    methods: {
        goToHome() {
            this.$router.push({ name: 'home' });
        },

        goToUser(username) {
            const isAuthenticated =
                this.$store.state.authentication.isAuthenticated;
            let route;
            if (isAuthenticated) {
                const user = this.$store.state.authentication.user;
                if (username === user.username)
                    return this.$router.push({
                        name: 'my-account/information',
                    });
                else {
                    return this.$router.push({
                        name: 'user/information',
                        params: { username },
                    });
                }
            } else {
                return this.$router.push({
                    name: 'user/information',
                    params: { username },
                });
            }
        },

        goToConversation(room) {
            const currentRoomID = this.$route.query.roomID || null;
            if (currentRoomID !== room.id) {
                return this.$router.push({
                    name: 'message',
                    query: { roomID: room.id },
                });
            }
        },

        goToCatalogBrowser(_sectionSlug, _categorySlug) {
            const route = this.$route.name;
            if (route === 'catalog-browser') {
                const sectionSlug = this.$route.params.sectionSlug || null;
                const categorySlug = this.$route.params.categorySlug || null;
                if (
                    _sectionSlug === sectionSlug &&
                    _categorySlug === categorySlug
                )
                    return false;
                return this.$router.push({
                    name: 'catalog-browser',
                    params: {
                        sectionSlug: sectionSlug,
                        categorySlug: categorySlug,
                    },
                });
            }
            return this.$router.push({
                name: 'catalog-browser',
                params: {
                    sectionSlug: _sectionSlug,
                    categorySlug: _categorySlug,
                },
            });
        },
    },
};

export default redirectionMixin;
