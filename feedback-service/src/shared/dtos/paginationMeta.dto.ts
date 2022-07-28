import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationMeta {
  @IsOptional()
  @IsInt()
  @Min(1)
  pageNumber: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  pageSize: number = 10;
}
