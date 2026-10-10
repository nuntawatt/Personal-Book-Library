import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { BookAuthor } from './entities/book-author.entity';
import { Category } from '../categories/entities/category.entity';
import { Author } from '../authors/entities/author.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      BookAuthor,
      Category,
      Author,
    ]),

    AuthModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
