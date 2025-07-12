import { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ product, view }) {
  const { dispatch } = useCart();
  const [variant, setVariant] = useState(
    product.variants?.length > 0 ? product.variants[0] : 'Default'
  );
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD',
      payload: { ...product, variant, qty }
    });
    setQty(1); 
  };

  return (
    <div
      className={`border border-[#C08081] p-4 rounded ${
        view === 'list' ? 'flex gap-4 items-center' : ''
      }`}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 mx-auto object-cover rounded"
      />

      <div className={`text-center ${view === 'list' ? 'text-left flex-1' : ''}`}>
        <h2 className="text-lg font-bold text-[#BF4F51]">{product.name}</h2>
        <p className="text-[#BF4F51]">₹{product.price}</p>

     
        {product.variants?.length > 0 && (
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="border mt-2 px-2 py-1 rounded text-sm text-[#65000B] font-bold w-3/5 bg-[#F4C2C2]"
          >
            {product.variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        )}

       
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="border w-16 mt-2 px-2 py-1 rounded text-center text-[#65000B] font-bold  bg-[#F4C2C2]"
        />

      
        <button
          className="mt-2 bg-[#B3446C] text-white px-3 py-1 rounded hover:bg-[#93354f] w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
