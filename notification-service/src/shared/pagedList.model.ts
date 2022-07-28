export class PagedList<T> {
  totalPage: number;

  constructor(
    public data: T[],
    public currentPage: number,
    public pageSize: number,
    public totalCount: number,
  ) {
    this.totalPage = Math.ceil(totalCount / pageSize);
  }
}
