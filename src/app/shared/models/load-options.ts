export interface LoadOptions {
  titleFilter?: string;
  sortBy?: SortByKeys;
  sortOrder?: SortOrderKeys;
  page: number;
  limit: number;
}

export interface Sort {
  sortBy: SortByKeys;
  sortOrder: SortOrderKeys;
}

export enum SortByKeys {
  title = 'title',
  price = 'price',
  rating = 'rating',
  creationDate = 'creationDate',
}

export enum SortOrderKeys {
  ASC = 'ASC',
  DESC = 'DESC',
}
