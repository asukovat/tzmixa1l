import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import Cart from './pages/cart';

const App: React.FC = () => {

  
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;