import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import tokenService from '@/services/token';
window.Pusher = Pusher;

const broadcastService = {
    initialize: () => {
        const token = tokenService.get('access_token') || null;
        if (!token) return;
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.VUE_APP_PUSHER_API_KEY,
            cluster: 'ap1',
            encrypted: false,
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            authEndpoint: process.env.VUE_APP_PUSHER_AUTH_ENDPOINT,
        });

        Pusher.log = function (message) {
            if (process.env.VUE_APP_ENV === 'development')
                window.console.log(message);
        };
    },

    disconnect() {
        window.Echo.disconnect();
    },
};

export default broadcastService;
