import millify from 'millify';

const utilityMixin = {
    methods: {
        isEven(number) {
            return number % 2 === 0;
        },

        isHTTPRequestSuccess(code) {
            return code && code >= 200 && code <= 299;
        },

        formatCurrency(type, amount) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: type,
                maximumFractionDigits: 2,
            });

            return formatter.format(amount);
        },

        toMillify(value) {
            return millify(value);
        },
    },
};

export default utilityMixin;
