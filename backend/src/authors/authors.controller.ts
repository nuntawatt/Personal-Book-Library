import { 
  Controller, 
  Get 
} from '@nestjs/common';

import { AuthorsService } from './authors.service';
// import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('api/authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService
  ) {}

  @Get()
  async findAll() {
    return this.authorsService.findAll();
  }
  
}
