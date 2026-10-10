import { 
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';
import { Author } from '../authors/entities/author.entity';
import { BookAuthor } from './entities/book-author.entity';

import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,

        @InjectRepository(BookAuthor)
        private readonly bookauthorRepository: Repository<BookAuthor>

    ) {}

    // GET (Find All)
    async findAll(
        category_id?: number,
        author_id?: number
    ): Promise<Book[]> {
        const query = this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.category', 'category')
            .leftJoinAndSelect('book.authors', 'book_author')
            .leftJoinAndSelect('book_author.author', 'author');
            
        if (category_id !== undefined) {
            query.andWhere('book.category_id = :category_id', { category_id });
        }

        if (author_id !== undefined) {
            query.andWhere('book_author.author_id = :author_id', { author_id });
        }

        return query.getMany();

    }

    // GET (Find By ID)
    async findById(id: number): Promise<Book> {
        const book = await this.bookRepository.findOne({
            where: {id},
            relations: {
                category: true,
                authors: {
                    author: true,
                }
            }
        });

        if (!book){
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return book;
    }

    // POST (Create Book)
    async create(dto: CreateBookDto) {
        const category = await this.categoryRepository.findOneBy({
            id: dto.category_id
        });

        if (!category) {
            throw new NotFoundException(`Category not found`);
        }

        const auhtors = await this.authorRepository.findBy({
            id: In(dto.author_ids)
        });

        if (auhtors.length !== dto.author_ids.length) {
            throw new NotFoundException('One or more authors not found');
        }

        const book = await this.bookRepository.save({
            title: dto.title,
            description: dto.description,
            category_id: dto.category_id
        });

        await this.bookauthorRepository.save(
            dto.author_ids.map((author_id) => ({
                book_id: book.id,
                author_id
            })),
        );

        return this.findById(book.id);

    }


    // DELETE (ID)
    async delete(id: number) {
        const book = await this.bookRepository.findOne({
            where: {id}
        });

        if (!book){
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        await this.bookRepository.delete(id);
    }

}
