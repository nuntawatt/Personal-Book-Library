import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FindBookDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    category_id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    author_id?: number;
}