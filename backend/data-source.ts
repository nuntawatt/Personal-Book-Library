import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

import { User } from './src/users/entities/user.entity';
import { Book } from './src/books/entities/book.entity';
import { Category } from './src/categories/entities/category.entity';
import { BookAuthor } from './src/books/entities/book-author.entity';
import { Author } from './src/authors/entities/author.entity';

export default new DataSource({
    type: 'postgres',

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    entities: [
        User,
        Book,
        Category,
        BookAuthor,
        Author
    ],

    migrations: ['migrations/*.ts'],

    synchronize: false
});