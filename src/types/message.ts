import { UserInformation } from '@/types/user';
import { ProductInformation } from '@/types/product';
import { TransactionInformation } from '@/types/transaction';

export type MessageChatInformation = {
    id: number;
    content: string;
    created_at: string;
    user: UserInformation;
};

export interface MessageRoomInformation {
    id: number;
    host: UserInformation;
    customer: UserInformation;
    recent_chat: MessageChatInformation;
    item: ProductInformation;
    transaction: TransactionInformation;
    created_at: string;
    updated_at: string;
}
