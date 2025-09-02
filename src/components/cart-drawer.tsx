import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addItems, removeItems, minusItem } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store';
import { CartItem } from '../types'
import CartDrawerItem from './cart-drawer-item';

import styles from '../scss/components/_cart-drawer.module.scss';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const onClickRemoveItems = React.useCallback(
    (id: number) => {
      dispatch(minusItem(id));
    },
    [dispatch],
  );

  const onClickAddItems = React.useCallback(
    (item: Omit<CartItem, 'count'>) => {
      dispatch(addItems(item));
    },
    [dispatch],
  );

  const onRemoveItemCompletely = React.useCallback(
    (id: number) => {
      dispatch(removeItems(id));
    },
    [dispatch],
  );
  return (
    <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Корзина</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2L3 3h2l.4 2M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  stroke="#ccc"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Корзина пуста</p>
            </div>
          ) : (
            items.map((item) => (
              <CartDrawerItem
                key={item.id}
                item={item}
                onRemoveOne={onClickRemoveItems}
                onAddOne={onClickAddItems}
                onRemoveCompletely={onRemoveItemCompletely}
              />
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <div className={styles.totalRow}>
                <span>Итого: </span>
                <span className={styles.totalPrice}>{totalPrice} ₽</span>
              </div>
            </div>

            <button className={styles.checkoutBtn}>
              <span>Оформить заказ</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
