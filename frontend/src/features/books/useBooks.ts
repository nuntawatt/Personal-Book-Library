import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../../lib/apiClient';
import { bookService } from './bookService';
import type { Book, BookFilters, CreateBookInput } from './types';

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filters, setFilters] = useState<BookFilters>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setBooks(await bookService.getAll(filters));
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // โหลดทันทีที่เปิดหน้า และโหลดใหม่ทุกครั้งที่เปลี่ยนตัวกรอง
    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    // เพิ่มสำเร็จ จะโหลดรายการใหม่
    const addBook = async (input: CreateBookInput) => {
        await bookService.create(input);
        await loadBooks();
    };

    // ลบสำเร็จ เอาออกจากรายการใน state ทันที
    const removeBook = async (id: number) => {
        try {
            await bookService.remove(id);
            setBooks((prev) => prev.filter((book) => book.id !== id));
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return { books, filters, setFilters, loading, error, addBook, removeBook };
}