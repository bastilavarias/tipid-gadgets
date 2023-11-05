import { UserInformation } from '@/types/user';
import { CommonReferenceInformation } from '@/types/common';

type ThreadSectionInformation = CommonReferenceInformation;

export interface ThreadInformation {
    id: number;
    name: string;
    slug: string;
    is_draft: number;
    user_id: number;
    topic_description_id: number;
    topic_section_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: boolean | null;
    comments_count: number;
    user: UserInformation;
    section: ThreadSectionInformation;
}

export interface ThreadCommentInformation {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    topic: ThreadInformation;
    reply_to: UserInformation | null;
    user: UserInformation | null;
}
