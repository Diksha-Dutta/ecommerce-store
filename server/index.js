const express = require('express');
const cors = require('cors');
const app = express();
const productsRoute = require('./routes/products');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoute);

app.get('/', (req, res) => {
  res.send('🧠 Backend is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
