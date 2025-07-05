import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const { dispatch } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 bg-[#F1DDCF]">
      <div className="flex justify-between mb-4 ">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded"
        />
        <div>
          <button onClick={() => setView('grid')}>🔳</button>
          <button onClick={() => setView('list')}>📋</button>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-3 gap-4' : 'flex flex-col gap-4'}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} view={view} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

export default Home;
