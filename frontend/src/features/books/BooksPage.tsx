import { useNavigate } from 'react-router-dom';
import { tokenStorage } from '../../lib/tokenStorage';
import { useLookups } from '../lookups/useLookups';
import { BookFilter } from './components/BookFilter';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { useBooks } from './useBooks';

export function BooksPage() {
    const navigate = useNavigate();
    const { books, filters, setFilters, loading, error, addBook, removeBook } = useBooks();
    const { authors, categories, error: lookupError } = useLookups();

    const handleLogout = () => {
        tokenStorage.clear();
        navigate('/login', { replace: true });
    };

    return (
        <div className="container">
        <header className="row between">
            <h1>Book Library</h1>
            <button onClick={handleLogout}>ออกจากระบบ</button>
        </header>

        {lookupError && <p className="error">{lookupError}</p>}

        <BookForm categories={categories} authors={authors} onSubmit={addBook} />

        <h2>รายการหนังสือ</h2>
        <BookFilter
            filters={filters}
            categories={categories}
            authors={authors}
            onChange={setFilters}
        />

        {loading && <p className="muted">กำลังโหลด...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <BookList books={books} onDelete={removeBook} />}
        </div>
    );
}