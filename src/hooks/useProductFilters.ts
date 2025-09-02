import { useState, useEffect } from 'react';
import qs from 'qs';

import { getCategoryId, getSortComparator } from '../constants';
import { Product } from '../types';

interface UseProductFiltersProps {
  products: Product[];
  initialCategory?: string;
  initialSort?: string;
  initialPage?: number;
}

interface UseProductFiltersResult {
  filteredAndSortedProducts: Product[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeSort: string;
  setActiveSort: (sort: string) => void;
}

export const useProductFilters = ({
  products,
  initialCategory = '',
  initialSort = 'популярности',
  initialPage = 0,
}: UseProductFiltersProps): UseProductFiltersResult => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeSort, setActiveSort] = useState<string>(initialSort);

  useEffect(() => {
    const queryString = window.location.search;
    const params = qs.parse(queryString, { ignoreQueryPrefix: true });

    const savedCategory = params.category as string;
    const savedSort = params.sort as string;
    const savedPage = params.page ? Number(params.page) - 1 : 0;

    if (savedCategory && savedCategory !== activeCategory) {
      setActiveCategory(savedCategory);
    }

    if (savedSort && savedSort !== activeSort) {
      setActiveSort(savedSort);
    }

    if (savedPage >= 0 && savedPage !== currentPage) {
      setCurrentPage(savedPage);
    }
  }, [activeCategory, activeSort, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      category: activeCategory,
      sort: activeSort,
      page: currentPage + 1,
    });

    window.history.pushState(null, '', `?${queryString}`);
  }, [activeCategory, activeSort, currentPage]);


  const filteredProducts = products.filter((product) => {
    const categoryId = getCategoryId(activeCategory);
    return categoryId ? product.category === categoryId : true;
  });

  const sortedProducts = (() => {
    const comparator = getSortComparator(activeSort);
    return comparator ? [...filteredProducts].sort(comparator) : filteredProducts;
  })();

  const ITEMS_PER_PAGE = 3;
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(offset, offset + ITEMS_PER_PAGE);

  return {
    filteredAndSortedProducts: currentProducts,
    currentPage,
    setCurrentPage,
    activeCategory,
    setActiveCategory,
    activeSort,
    setActiveSort,
  };
};