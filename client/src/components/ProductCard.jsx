import { useCart } from '../context/CartContext';

function ProductCard({ product, view }) {
  const { dispatch } = useCart(); // use the context

  return (
    <div className={`border border-[#C08081] p-4 rounded ${view === 'list' ? 'flex gap-4 items-center' : ''}`}>
      <img src={product.image} alt={product.name} className="w-32 h-32 mx-auto object-cover rounded" />
      
      <div className={`text-center ${view === 'list' ? 'text-left flex-1' : ''}`}>
        <h2 className="text-lg font-bold text-[#BF4F51]">{product.name}</h2>
        <p className="text-[#BF4F51]">₹{product.price}</p>
        <button
          className="mt-2 bg-[#B3446C] text-white px-3 py-1 rounded hover:bg-[#93354f]"
          onClick={() => dispatch({ type: 'ADD', payload: product })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
