import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../redux/slices/filterSlice'; 
import { RootState } from '../redux/store';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state: RootState) => state.filter.activeCategory);
  const categories: string[] = ['Еда', 'Одежда', 'Электроника'];

  const handleCategoryClick = (category: string): void => {
    dispatch(setActiveCategory(category));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => handleCategoryClick(category)} 
            role="button"
            tabIndex={0}
            aria-pressed={activeCategory === category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;