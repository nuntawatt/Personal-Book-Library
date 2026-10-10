import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';

import { Book } from '../../books/entities/book.entity';


@Entity('categorys')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 100 })
    name: string;

    @OneToMany(() => Book, (book) => book.category)
    books:Book[];

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
