import Echo from 'laravel-echo';
// @ts-ignore
import Pusher from 'pusher-js';
import tokenService from '@/services/token';
// @ts-ignore
window.Pusher = Pusher;

const broadcastService = {
    initialize: () => {
        const token = tokenService.get('access_token') || null;
        if (!token) return;
        // @ts-ignore
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
            authEndpoint: `${process.env.VUE_APP_BACK_END_URL}/broadcasting/auth`,
        });

        Pusher.log = function (message: string) {
            if (process.env.VUE_APP_ENV === 'development')
                window.console.log(message);
        };
    },

    disconnect() {
        // @ts-ignore
        window.Echo.disconnect();
    },
};

export default broadcastService;
