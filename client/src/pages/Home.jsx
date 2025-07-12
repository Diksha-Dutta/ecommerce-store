import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const container = {
    visible: {
      transition: { staggerChildren: 0.10 } 
    }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 bg-[#F1DDCF] min-h-screen">
         <div className="flex justify-between mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="border-[#C08081] p-2 rounded"
        />
        <div>
          <button onClick={() => setView('grid')}>🔳</button>
          <button onClick={() => setView('list')}>📋</button>
        </div>
      </div>

        <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'flex flex-col gap-4'
        }
      >
        {filtered.map(product => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} view={view} dispatch={dispatch} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Home;
