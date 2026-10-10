import { useState } from 'react';
import type { FormEvent } from 'react';
import { getErrorMessage } from '../../../lib/apiClient';
import type { Author, Category } from '../../lookups/types';
import type { CreateBookInput } from '../types';

interface Props {
    categories: Category[];
    authors: Author[];
    onSubmit: (input: CreateBookInput) => Promise<void>;
}

export function BookForm({ categories, authors, onSubmit }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [authorIds, setAuthorIds] = useState<number[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleAuthor = (id: number) => {
        setAuthorIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !categoryId || authorIds.length === 0) {
        setError('กรุณากรอกชื่อหนังสือ เลือกหมวดหมู่ และผู้แต่งอย่างน้อย 1 คน');
        return;
        }

        setSubmitting(true);
        setError(null);
        try {
        await onSubmit({
            title: title.trim(),
            description: description.trim() || undefined,
            category_id: Number(categoryId),
            author_ids: authorIds,
        });
        // สำเร็จ ล้างฟอร์ม
        setTitle('');
        setDescription('');
        setCategoryId('');
        setAuthorIds([]);
        } catch (err) {
        setError(getErrorMessage(err));
        } finally {
        setSubmitting(false);
        }
    };

    return (
        <form className="card" onSubmit={handleSubmit}>
        <h2>เพิ่มหนังสือ</h2>

        <input
            placeholder="ชื่อหนังสือ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
            placeholder="รายละเอียด (ไม่บังคับ)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />

        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">เลือกหมวดหมู่</option>
            {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
            ))}
        </select>

        <fieldset>
            <legend>ผู้แต่ง</legend>
            {authors.map((a) => (
            <label key={a.id} className="check">
                <input
                type="checkbox"
                checked={authorIds.includes(a.id)}
                onChange={() => toggleAuthor(a.id)}
                />
                {a.name}
            </label>
            ))}
        </fieldset>

        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={submitting}>
            {submitting ? 'กำลังบันทึก...' : 'เพิ่มหนังสือ'}
        </button>
        </form>
    );
}