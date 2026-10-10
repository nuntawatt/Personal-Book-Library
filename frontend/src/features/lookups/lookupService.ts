import { apiClient } from '../../lib/apiClient';
import type { Author, Category } from './types';

export const lookupService = {
    async getAuthors(): Promise<Author[]> {
        const { data } = await apiClient.get<Author[]>('/authors');
        return data;
    },
    async getCategories(): Promise<Category[]> {
        const { data } = await apiClient.get<Category[]>('/categories');
        return data;
    },
};