import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from './entities/author.entity';

// import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) {}

    async findAll(): Promise<Author[]> {
        return this.authorRepository.find({
            order: {
                name: 'ASC'
            }
        });
    }

}
