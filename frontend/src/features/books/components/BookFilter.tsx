import type { Author, Category } from '../../lookups/types';
import type { BookFilters } from '../types';

interface Props {
    filters: BookFilters;
    categories: Category[];
    authors: Author[];
    onChange: (filters: BookFilters) => void;
}

// แปลงค่าจาก <select> เป็นตัวเลข ถ้าเป็นค่าว่างให้เป็น undefined เพื่อไม่ส่งเป็น query param ไป backend
const toNumber = (value: string) => (value === '' ? undefined : Number(value));

export function BookFilter({ filters, categories, authors, onChange }: Props) {
    return (
        <div className="row">
        <select
            value={filters.category_id ?? ''}
            onChange={(e) => onChange({ ...filters, category_id: toNumber(e.target.value) })}
        >
            <option value="">Category</option>
            {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
            ))}
        </select>

        <select
            value={filters.author_id ?? ''}
            onChange={(e) => onChange({ ...filters, author_id: toNumber(e.target.value) })}
        >
            <option value="">Author</option>
            {authors.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
            ))}
        </select>

        <button type="button" onClick={() => onChange({})}>ล้างตัวกรอง</button>
        </div>
    );
}