import { apiClient } from '../../lib/apiClient';
import type { Book, BookFilters, CreateBookInput } from './types';

export const bookService = {
    async getAll(filters: BookFilters): Promise<Book[]> {
        const { data } = await apiClient.get<Book[]>('/books', { params: filters });
        return data;
    },
    async create(input: CreateBookInput): Promise<Book> {
        const { data } = await apiClient.post<Book>('/books', input);
        return data;
    },
    async remove(id: number): Promise<void> {
        await apiClient.delete(`/books/${id}`);
    },
};