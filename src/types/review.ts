import { TransactionInformation } from '@/types/transaction';
import { UserInformation } from '@/types/user';

export interface ReviewInformation {
    id: number;
    content: string;
    rating: string;
    created_at: string;
    updated_at: string;
    transaction: TransactionInformation;
    reviewer: UserInformation;
}
