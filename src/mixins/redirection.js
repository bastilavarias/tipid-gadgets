const redirectionMixin = {
    methods: {
        goToUser(username) {
            const isAuthenticated =
                this.$store.state.authentication.isAuthenticated;
            let route;
            if (this.isAuthenticated) {
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
    },
};

export default redirectionMixin;
