import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { BookAuthor } from './book-author.entity';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'text', nullable: true})
    description: string | null;

    @ManyToOne(() => Category, (category) => category.books, {
        nullable: false,
        onDelete: 'RESTRICT'
    })
    @JoinColumn({ name: 'category_id'})
    category: Category;

    @Column()
    category_id: number;

    @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.book)
    authors: BookAuthor[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
