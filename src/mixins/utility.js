const utilityMixin = {
    methods: {
        isEven(number) {
            return number % 2 === 0;
        },

        isHTTPRequestSuccess(code) {
            return code && code >= 200 && code <= 299;
        },
    },
};

export default utilityMixin;
