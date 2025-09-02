import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import catalogData from '../assets/catalog.json';
import { useProductFilters } from '../hooks/useProductFilters';
import { Product } from 'types';
import Pagination from 'features/pagination';
import CartItem from 'components/cart-item';
import Categories from 'components/categories';
import Sort from 'components/sort';

const Home: React.FC = () => {
  const { activeCategory, activeSort } = useSelector((state: RootState) => state.filter);

  const { 
    filteredAndSortedProducts, 
    currentPage, 
    setCurrentPage,
    setActiveCategory,
    setActiveSort,
  } = useProductFilters({
    products: catalogData as Product[],
    initialCategory: activeCategory,
    initialSort: activeSort,
  });

  const handlePageChange = (event: { selected: number }): void => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Купите по-братски</h2>
      <div className="cart-item-block">
        {filteredAndSortedProducts.map((product: Product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <Pagination onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;