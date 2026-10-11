import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../lib/apiClient';
import { lookupService } from './lookupService';
import type { Author, Category } from './types';

export function useLookups() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // ใช้ Promise.all ยิงดึงข้อมูลผู้แต่งและหมวดหมู่พร้อมกัน
        Promise.all([lookupService.getAuthors(), lookupService.getCategories()])
        .then(([authorList, categoryList]) => {
            setAuthors(authorList);
            setCategories(categoryList);
        })
        .catch((err) => setError(getErrorMessage(err)));
    }, []);

    return { authors, categories, error };
}