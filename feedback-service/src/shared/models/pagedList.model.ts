export class PagedList<T> {
  totalCount: number;
  totalPage: number;

  constructor(
    public data: T[],
    public currentPage: number,
    public pageSize: number,
  ) {
    this.totalCount = data.length;
    this.totalPage = Math.ceil(this.totalCount / pageSize);
  }
}
