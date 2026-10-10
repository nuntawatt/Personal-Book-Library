import {
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { BookAuthor} from '../../books/entities/book-author.entity';

@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        () => BookAuthor, 
        (bookAuthor) => bookAuthor.author
    )
    books: BookAuthor[];

    @CreateDateColumn({name: 'create_at'})
    created_at: Date;

    @UpdateDateColumn({name: 'update_at'})
    updated_at: Date;
}
