import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#EE8800',
                secondary: '#303030',
            },
        },
    },
})

export default vuetify;
