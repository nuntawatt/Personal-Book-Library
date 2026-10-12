import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';
import { Category } from './categories/entities/category.entity';
import { BookAuthor } from './books/entities/book-author.entity';
import { Author } from './authors/entities/author.entity';

import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      // เชื่อม ssl ต่อนอก render
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,

      entities:[
        User,
        Book,
        Category,
        BookAuthor,
        Author
      ],

      synchronize: false,
    }),

    BooksModule,
    CategoriesModule,
    AuthorsModule,
    AuthModule

  ]
})
export class AppModule {}
