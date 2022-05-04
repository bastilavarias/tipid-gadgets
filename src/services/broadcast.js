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
            authEndpoint: `http://127.0.0.1:8000/broadcasting/auth`,
        });

        Pusher.log = function (message) {
            window.console.log(message);
        };
    },

    disconnect() {
        window.Echo.disconnect();
    },
};

export default broadcastService;
