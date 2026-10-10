import {
    ArrayMinSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    Min
} from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt()
    @Min(1)
    category_id: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true})
    @Min(1, {each:true})
    author_ids: number[];
}
