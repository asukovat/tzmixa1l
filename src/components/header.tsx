import React from 'react';
import CartButton from './cart-button';

const Header: React.FC = () => {
  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="header__logo">
            <div>
              <h1>TZ MIXAIL</h1>
              <p>Performance Lab</p>
            </div>
          </div>
          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default Header;