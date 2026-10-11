import type { Book } from '../types';

interface Props {
    books: Book[];
    onDelete: (id: number) => void;
}

export function BookList({ books, onDelete }: Props) {
    if (books.length === 0) {
        return <p className="muted">ไม่พบหนังสือ</p>;
    }

    return (
        <ul className="list">
        {books.map((book) => (
            <li key={book.id} className="card">
            <div>
                <h3>{book.title}</h3>
                {book.description && <p>{book.description}</p>}
                {/* Backend ส่งความสัมพันธ์ Many-to-Many มาเป็น Array ของ BookAuthor จึงต้องดึง item.author.name แล้วต่อด้วยจุลภาค */}
                <p className="muted">
                หมวดหมู่: {book.category?.name ?? '-'} | ผู้แต่ง:{' '}
                {book.authors.map((item) => item.author.name).join(', ') || '-'}
                </p>
            </div>
            <button
                className="danger"
                onClick={() => {
                if (window.confirm(`ลบ "${book.title}" ?`)) onDelete(book.id);
                }}
            >
                ลบ
            </button>
            </li>
        ))}
        </ul>
    );
}