import { PagedList } from '../shared';

export class Utils {
  public static getPagedList<T>(
    source: T[],
    pageNumber: number,
    pageSize: number,
    totalCount: number,
  ): [T[], string] {
    const { data, ...rest } = new PagedList(
      source,
      pageNumber,
      pageSize,
      totalCount,
    );

    const paginationMeta = JSON.stringify(rest);
    return [data, paginationMeta];
  }
}
