
// Interface untuk kategori
export interface Category {
    category_id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}