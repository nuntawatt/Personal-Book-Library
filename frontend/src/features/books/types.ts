import type { Author, Category } from '../lookups/types';

export interface Book {
    id: number;
    title: string;
    description?: string | null;
    category?: Category;
    authors: { author: Author }[];
}

export interface CreateBookInput {
    title: string;
    description?: string;
    category_id: number;
    author_ids: number[];
}

export interface BookFilters {
    category_id?: number;
    author_id?: number;
}