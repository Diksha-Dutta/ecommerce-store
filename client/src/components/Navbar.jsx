import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-[#AB4E52] text-[#FFE4E1] p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">💅 VelvetMuse</Link>
      <Link to="/cart" className="hover:underline">
        Cart ({cart.length})
      </Link>
    </nav>
  );
}

export default Navbar;
