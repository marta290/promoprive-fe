export interface IFilterItem {
  id: string;
  value: string;
}

export interface IFiltersResponse {
  brands: IFilterItem[];
  categories: IFilterItem[];
}