import moment from 'moment';

const dateMixin = {
    toPostDate(timestamp: string) {
        return moment(new Date(timestamp)).calendar();
    },

    toChatDate(timestamp: string) {
        return moment(new Date(timestamp)).fromNow();
    },
};

export default dateMixin;
