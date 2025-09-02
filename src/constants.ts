import { Product } from "types";

export const CATEGORIES = [
  'Еда',
  'Одежда',
  'Электроника',
];

export const SORT_OPTIONS = [
  'популярности',
  'цене',
  'алфавиту',
];

export const CATEGORY_MAP = {
  Еда: 1,
  Одежда: 2,
  Электроника: 3,
} as const;


export type CategoryName = keyof typeof CATEGORY_MAP;


export type CategoryId = (typeof CATEGORY_MAP)[CategoryName];


export const getCategoryId = (name: string): CategoryId | null => {
  return (CATEGORY_MAP as Record<string, CategoryId>)[name] || null;
};

export const SORT_MAP = {
  популярности: (a: Product, b: Product) => b.rating - a.rating,
  цене: (a: Product, b: Product) => a.price - b.price,
  алфавиту: (a: Product, b: Product) => a.title.localeCompare(b.title),
} as const satisfies Record<string, (a: Product, b: Product) => number>;

export type SortOption = keyof typeof SORT_MAP;

export const getSortComparator = (option: string) => {
  return (SORT_MAP as Record<string, (a: Product, b: Product) => number>)[option] || null;
};