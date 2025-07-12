import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const { cart } = useCart();
  const [updatedCart, setUpdatedCart] = useState(cart);

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  const deliveryDateStr = estimatedDelivery.toDateString();

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const updateQty = (index, qty) => {
    const updated = [...updatedCart];
    updated[index].qty = Math.max(1, qty);
    setUpdatedCart(updated);
  };

  const updateVariant = (index, newVariant) => {
    const updated = [...updatedCart];
    updated[index].variant = newVariant;
    setUpdatedCart(updated);
  };

  const total = updatedCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'Cash on Delivery') {
      setSubmitted(true);
    } else {
      const options = {
        key: 'rzp_test_Key',
        amount: total * 100,
        currency: 'INR',
        name: 'VelvetMuse',
        description: 'Cosmetics & Beauty Products',
        handler: function () {
          setSubmitted(true);
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: '#B3446C'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  const handleCancel = () => {
    setSubmitted(false);
    setPaymentMethod('');
    setShowForm(false);
    setUserDetails({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  };

  if (submitted) {
    return (
      <div className="bg-[#F1DDCF] min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-[#B3446C] text-center mb-2">
          Thank you for shopping with VelvetMuse
        </h1>
        <p className="text-md mt-2 text-[#893F45]">
          Payment Method: <strong>{paymentMethod}</strong>
        </p>
        <p className="text-md mt-1 text-[#893F45]">
          Expected Delivery: <strong>{deliveryDateStr}</strong>
        </p>

        <h3 className="mt-6 text-lg font-semibold text-[#674846] underline">Your Order</h3>
        <ul className="mt-2 text-left w-full max-w-md">
          {updatedCart.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b py-2 text-sm">
              <div>
                <span className="font-medium">{item.name}</span>
                <div className="text-xs text-gray-600">
                  Variant: {item.variant} | Qty: {item.qty}
                </div>
              </div>
              <span>₹{item.price * item.qty}</span>
            </li>
          ))}
          <li className="flex justify-between pt-3 font-semibold text-[#AB4E52] text-base border-t mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-3 w-full max-w-md">
          <a
            href="/shop"
            className="bg-[#B3446C] text-white px-4 py-2 rounded hover:bg-[#93354f] text-center"
          >
            Continue Shopping
          </a>
          <button
            className="border border-[#B3446C] text-[#B3446C] px-4 py-2 rounded hover:bg-[#f9e3e3] transition"
            onClick={handleCancel}
          >
            Cancel Order
          </button>
          <button
            className="border border-[#93354f] text-[#93354f] px-4 py-2 rounded hover:bg-[#fde6e6] transition"
            onClick={() => {
              setShowForm(true);
              setSubmitted(false);
            }}
          >
            Modify Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1DDCF] min-h-screen flex justify-center items-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-xl border border-[#65000B]">
        {!showForm ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#674846] text-center">
              Choose your payment method
            </h2>
            <div className="space-y-4">
              <button
                className="w-full border border-[#65000B] text-[#AB4E52] px-4 py-2 rounded hover:bg-[#65000B] hover:text-[#F1DDCF] transition"
                onClick={() => {
                  setPaymentMethod('Cash on Delivery');
                  setShowForm(true);
                }}
              >
                Cash on Delivery (COD)
              </button>

              <button
                className="w-full border border-[#65000B] text-[#AB4E52] px-4 py-2 rounded hover:bg-[#65000B] hover:text-[#F1DDCF] transition"
                onClick={() => {
                  loadRazorpay();
                  setPaymentMethod('Razorpay');
                  setShowForm(true);
                }}
              >
                Pay with Razorpay
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#674846] text-center">Enter your details</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="address"
                required
                placeholder="Delivery Address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />

              <div className="bg-[#F8EDEB] p-3 rounded border mt-2">
                <h3 className="text-md font-semibold text-[#AB4E52] mb-2">Modify Your Order</h3>
                <ul className="space-y-2 text-sm">
                  {updatedCart.map((item, idx) => (
                    <li key={idx} className="border-b pb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{item.name}</span>
                        {item.variantOptions?.length ? (
                          <select
                            value={item.variant}
                            onChange={e => updateVariant(idx, e.target.value)}
                            className="border border-[#C08081] rounded text-xs px-1 py-0.5"
                          >
                            {item.variantOptions.map(v => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-xs text-gray-500">Default</span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="px-2 bg-[#AB4E52] text-white rounded disabled:opacity-50"
                            onClick={() => updateQty(idx, item.qty - 1)}
                            disabled={item.qty <= 1}
                          >
                            –
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={e => updateQty(idx, Number(e.target.value))}
                            className="w-12 border text-center rounded"
                          />
                          <button
                            type="button"
                            className="px-2 bg-[#AB4E52] text-white rounded"
                            onClick={() => updateQty(idx, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold">₹{item.price * item.qty}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between font-bold mt-3 pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#B3446C] text-white px-4 py-2 rounded hover:bg-[#93354f]"
              >
                {paymentMethod === 'Cash on Delivery' ? 'Place Order' : 'Proceed to Payment'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
