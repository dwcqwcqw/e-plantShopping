import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showHome, setShowHome] = useState(false);
  // Get cart state from Redux store
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(state => state.cart.total);

  const handleGetStarted = () => {
    setShowHome(true);
  };

  return (
    <div className="app-container">
      {!showHome ? (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome to Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <p className="company-description">
                At Paradise Nursery, we are passionate about bringing nature closer to you. 
                Our mission is to provide a wide range of high-quality plants that not only 
                enhance the beauty of your surroundings but also contribute to a healthier and 
                more sustainable lifestyle. From air-purifying plants to aromatic fragrant ones, 
                we have something for every plant enthusiast.
              </p>
              <button className="get-started-button" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowHome(false)} />
      )}
      
      {/* Debug information - only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <h3>Debug Information</h3>
          <p>Cart Items: {cartItems.length}</p>
          <p>Total: ${cartTotal.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;



