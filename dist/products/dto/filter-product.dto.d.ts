export declare class FilterProductDto {
    search?: string;
    category_id?: number;
    min_price?: number;
    max_price?: number;
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
}
