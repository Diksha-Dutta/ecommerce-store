import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
function Cart() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 text-center text-[#BF4F51]">
      <h1 className="text-2xl mb-4">🛍 Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map(item => (
              <li key={item.id} className="mb-2">
                {item.name} - ₹{item.price}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ₹{total}</p>
          <Link to="/checkout">
           <button className="mt-2 bg-[#B3446C] text-white px-3 py-1 rounded hover:bg-[#93354f]">
              Proceed to Pay
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
