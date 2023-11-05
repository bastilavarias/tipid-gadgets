import { UserInformation } from '@/types/user';
import { CommonReferenceInformation } from '@/types/common';

type ProductCategoryInformation = CommonReferenceInformation;
type ProductSectionInformation = CommonReferenceInformation;
type ProductConditionInformation = CommonReferenceInformation;
type ProductWarrantyInformation = CommonReferenceInformation;
type ProductDescriptionInformation = {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
};

export interface ProductInformation {
    id: number;
    name: string;
    slug: string;
    price: string | number;
    is_draft: number;
    user_id: number;
    item_description_id: number;
    item_section_id: number;
    item_category_id: number;
    item_condition_id: number;
    item_warranty_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: boolean | null;
    user: UserInformation;
    category: ProductCategoryInformation;
    section: ProductSectionInformation;
    condition: ProductConditionInformation;
    warranty: ProductWarrantyInformation;
    description: ProductDescriptionInformation;
}
