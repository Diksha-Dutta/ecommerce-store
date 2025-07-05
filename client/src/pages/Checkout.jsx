import { useState } from 'react';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (method) => {
    setPaymentMethod(method);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#F1DDCF] min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[#893F45] mb-4">
          Thank you for shopping with <span className="text-[#CD5C5C]">VelvetMuse</span> ✨
        </h1>
        <p className="text-md text-[#893F45]">Your payment method: <strong>{paymentMethod}</strong></p>
        <a href="/" className="text-[#AB4E52] underline mt-4 block">
  Shop More
</a>
      </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1DDCF] min-h-screen">
    <div className="max-w-md mx-auto  bg-white shadow-lg p-6 rounded-xl border border-charcoal">
      <h2 className="text-xl font-bold mb-4 text-[#674846] text-center">Choose your payment method</h2>

      <div className="space-y-4">
        <button
          className="w-full border border-charcoal text-[#AB4E52] px-4 py-2 rounded hover:bg-charcoal hover:text-[#C08081] transition"
          onClick={() => handleSelect('Cash on Delivery')}
        >
          Cash on Delivery (COD)
        </button>

        <button
          className="w-full border border-charcoal text-[#AB4E52] px-4 py-2 rounded hover:bg-charcoal hover:text-[#C08081] transition"
          onClick={() => handleSelect('Credit/Debit Card')}
        >
          Card Payment
        </button>

        <button
          className="w-full border border-charcoal text-[#AB4E52] px-4 py-2 rounded hover:bg-charcoal hover:text-[#C08081] transition"
          onClick={() => handleSelect('UPI')}
        >
          UPI / QR Code
        </button>
      </div>
    </div>
    </div>
  );
}

export default Checkout;
