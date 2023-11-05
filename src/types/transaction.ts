import { ProductInformation } from '@/types/product';

export type TransactionInformation = {
    id: number;
    status: string;
    created_at: string;
    updated_at: string;
    item: ProductInformation;
};
