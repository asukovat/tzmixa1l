import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';

import Categories from '../components/categories';
import Sort from '../components/sort';
import CartItem from '../components/cart-item';
import Pagination from '../features/pagination';

import catalogData from '../assets/catalog.json';
import { setActiveCategory, setActiveSort } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';


interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: number;
  rating: number;
  sizes?: string[];
}


const ITEMS_PER_PAGE = 3;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { activeCategory, activeSort } = useSelector((state: RootState) => state.filter);

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  // work with save url
  useEffect(() => {
    const queryString = window.location.search;
    const params = qs.parse(queryString, { ignoreQueryPrefix: true });

    const savedCategory = params.category as string;
    const savedSort = params.sort as string;
    const savedPage = params.page ? Number(params.page) - 1 : 0; 

    if (savedCategory && ['Еда', 'Одежда', 'Электроника'].includes(savedCategory)) {
      dispatch(setActiveCategory(savedCategory));
    }

    if (savedSort && ['популярности', 'цене', 'алфавиту'].includes(savedSort)) {
      dispatch(setActiveSort(savedSort));
    }

    if (savedPage >= 0) {
      setCurrentPage(savedPage);
    }

    setProducts(catalogData as Product[]);
  }, [dispatch]);

  useEffect(() => {
    const queryString = qs.stringify({
      category: activeCategory,
      sort: activeSort,
      page: currentPage + 1, 
    });

    window.history.pushState(null, '', `?${queryString}`);
  }, [activeCategory, activeSort, currentPage]);

  const handlePageChange = (event: { selected: number }): void => {
    setCurrentPage(event.selected);
  };

  const filteredProducts = products.filter((product: Product) => {
    if (activeCategory === 'Еда') return product.category === 1;
    if (activeCategory === 'Одежда') return product.category === 2;
    if (activeCategory === 'Электроника') return product.category === 3;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a: Product, b: Product) => {
    if (activeSort === 'популярности') return b.rating - a.rating;
    if (activeSort === 'цене') return a.price - b.price;
    if (activeSort === 'алфавиту') return a.title.localeCompare(b.title);
    return 0;
  });

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Купите по-братски</h2>
      <div className="cart-item-block">
        {currentProducts.map((product: Product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <Pagination onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;