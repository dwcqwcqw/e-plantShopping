import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showHome, setShowHome] = useState(true);
  // Get cart state from Redux store
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(state => state.cart.total);

  const handleHomeClick = () => {
    setShowHome(true);
  };

  return (
    <div className="app-container">
      {showHome ? (
        <ProductList onHomeClick={handleHomeClick} />
      ) : (
        <div className="welcome-screen">
          <h1>Welcome to Paradise Nursery</h1>
          <button onClick={handleHomeClick}>Start Shopping</button>
        </div>
      )}
      
      {/* Debug information - only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info" style={{ display: 'none' }}>
          <h3>Debug Information</h3>
          <p>Cart Items: {cartItems.length}</p>
          <p>Total: ${cartTotal.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;



