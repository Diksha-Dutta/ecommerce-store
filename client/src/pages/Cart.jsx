import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, dispatch } = useCart();

  const handleQty = (id, variant, newQty) =>
    dispatch({ type: 'UPDATE_QTY', id, variant, qty: newQty });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="bg-[#F1DDCF] min-h-screen p-6">
      <h1 className="text-2xl font-bold text-[#65000B] mb-4 text-center">🛍 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6 space-y-4">
            {cart.map(item => (
              <li
                key={`${item.id}-${item.variant}`}
                className="border border-[#C08081] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <p className="font-extrabold text-[#65000B]">{item.name}</p>
                  <p className="text-sm text-[#B3446C] font-bold">Variant: {item.variant}</p>
                  <p className="text-[#BF4F51] font-semibold">₹{item.price}</p>
                </div>

             
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQty(item.id, item.variant, item.qty - 1)
                    }
                    className="px-2 pb-1 bg-[#AB4E52] text-white text-center rounded disabled:opacity-40"
                    disabled={item.qty <= 1}
                  >
                    –
                  </button>
                  <input
                    type="number"
                    value={item.qty}
                    min={1}
                    onChange={e =>
                      handleQty(item.id, item.variant, Number(e.target.value))
                    }
                    className="w-14 text-center border border-[#65000B] rounded"
                  />
                  <button
                    onClick={() =>
                      handleQty(item.id, item.variant, item.qty + 1)
                    }
                    className="px-2 pb-1 bg-[#AB4E52] text-white text-center rounded"
                  >
                    +
                  </button>

                 
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE',
                        id: item.id,
                        variant: item.variant
                      })
                    }
                    className="text-red-500 text-lg ml-2"
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right text-xl font-semibold text-[#65000B] mb-6">
            Subtotal: ₹{subtotal}
          </div>

          <Link to="/checkout">
            <button className="w-full bg-[#B3446C] text-white py-3 rounded hover:bg-[#93354f]">
              Proceed to Pay
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
