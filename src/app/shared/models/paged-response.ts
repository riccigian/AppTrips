export interface PagedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
