import { 
  Controller, 
  Get, 
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  Param,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';

import { BooksService } from './books.service';
import { FindBookDto } from './dto/find-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService
  ) {}

  @Get()
  async findAll(@Query() query: FindBookDto) {
    return this.booksService.findAll(
      query.category_id,
      query.author_id
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.booksService.findById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBookDto: CreateBookDto){
    return this.booksService.create(createBookDto);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.booksService.delete(id);
  }

}
