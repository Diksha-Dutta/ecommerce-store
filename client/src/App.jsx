import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
         
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
