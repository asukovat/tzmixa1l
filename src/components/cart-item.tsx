import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItems } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store';

import styles from '../scss/components/_cart-item.module.scss';
import { Product } from 'types';



interface CartItemProps {
  product: Product;
}

type NewCartItem = Omit<CartStoreItem, 'count'>;

type CartStoreItem = Pick<Product, 'id' | 'title' | 'price' | 'imageUrl'> & { 
  size?: string; 
  count: number;
};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj: CartStoreItem) => obj.id === product.id),
  );

  const [activeSize, setActiveSize] = React.useState<string | undefined>(product.sizes?.[0]);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = (): void => {
    const item: NewCartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      size: activeSize,
    };

    dispatch(addItems(item));
  };

  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItem__image} src={product.imageUrl} alt={product.title} />
      <h4 className={styles.cartItem__title}>{product.title}</h4>

      {product.sizes && product.sizes.length > 0 && (
        <div className={styles.cartItem__selector}>
          <ul>
            {product.sizes.map((size: string) => (
              <li
                key={size}
                onClick={() => setActiveSize(size)}
                className={size === activeSize ? `${styles.active}` : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.cartItem__bottom}>
        <div className={styles.cartItem__price}>от {product.price} ₽</div>
        <button className="button button--outline button--add" onClick={onClickAdd} type="button">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
