const identifierMixin = {
    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },

    methods: {
        isYou(_user) {
            return this.user.id === _user.id;
        },
    },
};

export default identifierMixin;
