import apiService from '@/services/api';
import { CommonPaginationPayloadInformation } from '@/types/common';

export const MESSAGE_INQUIRE_PRODUCT = 'message/initiate-chat';
export const MESSAGE_GET_USER_ROOMS = 'message/get-user-rooms';
export const MESSAGE_GET_ROOM_CHATS = 'message/get-room-chats';
export const MESSAGE_SEND_CHAT = 'message/send-chat';
export const MESSAGE_GET_ROOM = 'message/get-room';

interface GetRoomChatsPayload extends CommonPaginationPayloadInformation {
    roomID: number;
}

const messageModule = {
    actions: {
        async [MESSAGE_INQUIRE_PRODUCT](_: object, payload: object) {
            try {
                const response = await apiService.post(
                    '/message/inquire',
                    payload
                );
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [MESSAGE_GET_USER_ROOMS](
            _: object,
            payload: CommonPaginationPayloadInformation
        ) {
            try {
                const route = `${apiService.baseURL()}/message/room/user`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const { page, perPage } = payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                const response = await apiService.get(
                    `/message/room/user?${params}`
                );
                const rooms = response.data;
                return apiService.formatResult(true, rooms);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [MESSAGE_GET_ROOM_CHATS](
            _: object,
            payload: GetRoomChatsPayload
        ) {
            try {
                const roomID = payload.roomID;
                const route = `${apiService.baseURL()}/message/chat/${roomID}`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                const { page, perPage } = payload;
                if (page) params.set('page', String(page));
                if (perPage) params.set('per_page', String(perPage));
                const response = await apiService.get(
                    `/message/chat/${roomID}?${params}`
                );
                const rooms = response.data;
                return apiService.formatResult(true, rooms);
            } catch (error) {
                return apiService.formatResult(false, []);
            }
        },

        async [MESSAGE_SEND_CHAT](_: object, payload: object) {
            try {
                const response = await apiService.post(
                    '/message/chat',
                    payload
                );
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },

        async [MESSAGE_GET_ROOM](_: object, roomID: number) {
            try {
                const response = await apiService.get(
                    `/message/room/${roomID}`,
                    roomID
                );
                const data = response.data;
                return apiService.formatResult(true, data);
            } catch (error: any) {
                return apiService.formatResult(
                    false,
                    null,
                    error.response.data.message
                );
            }
        },
    },
};

export default messageModule;
