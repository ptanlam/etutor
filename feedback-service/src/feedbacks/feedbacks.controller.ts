import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { iif, map, of, switchMap, tap, throwError } from 'rxjs';
import { PagedList } from '../shared/models';
import {
  AddNewFeedbackDto,
  GetFeedbackListDto,
  UpdateFeedbackDto,
} from './dtos';
import { FeedbacksService } from './feedbacks.service';
import { GetFeedbackListDtoValidationPipe } from './pipes';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly _feedbacksService: FeedbacksService) {}

  @Get()
  getList(
    @Query(new GetFeedbackListDtoValidationPipe())
    getFeedbackListDto: GetFeedbackListDto,
    @Res() response: Response,
  ) {
    const { topicId, ownerId, pageNumber, pageSize } = getFeedbackListDto;

    return this._feedbacksService.findListForTarget(topicId, ownerId).pipe(
      map((feedbackList) => {
        const [pagedList, paginationMeta] = this.getPagedList(
          feedbackList,
          pageNumber,
          pageSize,
        );

        response.setHeader('X-Pagination', paginationMeta);
        return response.send(pagedList);
      }),
    );
  }

  @Post()
  add(@Body() addNewFeedbackDto: AddNewFeedbackDto) {
    return this._feedbacksService.addNew(addNewFeedbackDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this._feedbacksService.update(id, updateFeedbackDto).pipe(
      tap(console.log),
      switchMap((feedback) =>
        iif(
          () => !feedback,
          throwError(
            () => new NotFoundException(`Cannot find feedback with id ${id}`),
          ),
          of(feedback!),
        ),
      ),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this._feedbacksService.remove(id).pipe(
      switchMap((feedback) =>
        iif(
          () => !feedback,
          throwError(
            () => new NotFoundException(`Cannot find feedback with id ${id}`),
          ),
          of(feedback),
        ),
      ),
    );
  }

  private getPagedList<T>(
    source: T[],
    pageNumber: number,
    pageSize: number,
  ): [T[], string] {
    const pagedList = new PagedList(source, pageNumber, pageSize);

    const paginationMeta = JSON.stringify({
      totalCount: pagedList.totalCount,
      totalPage: pagedList.totalPage,
      currentPage: pagedList.currentPage,
      pageSize: pagedList.pageSize,
    });

    return [pagedList.data, paginationMeta];
  }
}
