import React, { memo } from 'react';

import { CartItem } from '../types';

import styles from '../scss/components/_cart-drawer.module.scss';

interface CartDrawerItemProps {
  item: CartItem;
  onRemoveOne: (id: number) => void;
  onAddOne: (item: Omit<CartItem, 'count'>) => void;
  onRemoveCompletely: (id: number) => void;
}

const CartDrawerItem: React.FC<CartDrawerItemProps> = ({
  item,
  onRemoveOne,
  onAddOne,
  onRemoveCompletely,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemImageContainer}>
        <img src={item.imageUrl} alt={item.title} className={styles.itemImage} />
      </div>

      <div className={styles.itemContent}>
        <div className={styles.itemDetails}>
          <h4 className={styles.itemName}>{item.title}</h4>
          <p className={styles.itemPrice}>{item.price * item.count} ₽</p>
          {item.size && <p className={styles.itemSize}>Размер: {item.size} см</p>}
        </div>

        <div className={styles.itemControls}>
          <div className={styles.quantityControls}>
            <button
              className={styles.quantityBtn}
              onClick={() => onRemoveOne(item.id)}
              disabled={item.count <= 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <span className={styles.quantity}>{item.count}</span>
            <button
              className={styles.quantityBtn}
              onClick={() => onAddOne(item)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <button
            className={styles.removeBtn}
            onClick={() => onRemoveCompletely(item.id)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CartDrawerItem);