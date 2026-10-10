import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';

import { Book } from './book.entity';
import { Author } from '../../authors/entities/author.entity';

@Entity('book_authors')
export class BookAuthor {
    @PrimaryColumn()
    book_id: number;

    @PrimaryColumn()
    author_id: number;

    @ManyToOne(() => Book, (book) => book.authors, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'book_id' })
    book: Book;

    @ManyToOne(() => Author, (author) => author.books, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'author_id' })
    author: Author;
}