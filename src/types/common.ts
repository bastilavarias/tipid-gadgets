export interface CommonReferenceInformation {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export type CommonPaginationPayloadInformation = {
    page: number;
    perPage: number | null;
    sortBy: string | null;
    orderBy: string | null;
    search: string | null;
    filterBy: string | null;
};
