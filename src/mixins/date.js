import moment from 'moment';

const dateMixin = {
    methods: {
        toPostDate(timestamp) {
            return moment(new Date(timestamp)).format('MMMM D, YYYY h:mm A');
        },
    },
};

export default dateMixin;
