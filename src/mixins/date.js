import moment from 'moment';

const dateMixin = {
    methods: {
        toPostDate(timestamp) {
            return moment(new Date(timestamp)).format('MMMM D, YYYY h:mm A');
        },

        toChatDate(timestamp) {
            return moment(new Date(timestamp)).startOf('hour').fromNow();
        },
    },
};

export default dateMixin;
