import {
  Controller, 
  Get
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
// import { CreateCategoryDto } from './dto/create-category.dto';


@Controller('api/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

}
