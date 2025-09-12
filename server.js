const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');

async function readDb() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { products: [], transactions: [] };
  }
}
async function writeDb(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

const LOW_STOCK_DEFAULT = 5;

// GET all products
app.get('/api/products', async (req, res) => {
  const db = await readDb();
  res.json(db.products);
});

// GET product by id
app.get('/api/products/:id', async (req, res) => {
  const db = await readDb();
  const p = db.products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json(p);
});

// Create product
app.post('/api/products', async (req, res) => {
  const { name, description = '', category = 'General', price, quantity } = req.body;
  if (!name || price == null || quantity == null) {
    return res.status(400).json({ message: 'name, price and quantity required' });
  }
  const db = await readDb();
  const product = {
    id: nanoid(),
    name,
    description,
    category,
    price: Number(price),
    quantity: Number(quantity),
    lowStockThreshold: LOW_STOCK_DEFAULT
  };
  db.products.push(product);
  await writeDb(db);
  res.status(201).json(product);
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  const db = await readDb();
  const idx = db.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const updated = { ...db.products[idx], ...req.body, price: Number(req.body.price ?? db.products[idx].price), quantity: Number(req.body.quantity ?? db.products[idx].quantity) };
  db.products[idx] = updated;
  await writeDb(db);
  res.json(updated);
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  const db = await readDb();
  db.products = db.products.filter(p => p.id !== req.params.id);
  await writeDb(db);
  res.json({ message: 'deleted' });
});

// Create transaction (add/deduct)
app.post('/api/transactions', async (req, res) => {
  const { productId, type, quantity, note = '' } = req.body;
  if (!productId || !type || quantity == null) {
    return res.status(400).json({ message: 'productId, type, quantity required' });
  }
  const db = await readDb();
  const product = db.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const q = Number(quantity);
  if (type === 'deduct' && product.quantity - q < 0) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }

  product.quantity = type === 'add' ? product.quantity + q : product.quantity - q;

  const tx = {
    id: nanoid(),
    productId,
    type,
    quantity: q,
    note,
    date: new Date().toISOString()
  };
  db.transactions.push(tx);
  await writeDb(db);
  res.status(201).json({ product, tx });
});

// GET transactions
app.get('/api/transactions', async (req, res) => {
  const db = await readDb();
  // newest first
  const tx = db.transactions.slice().sort((a,b) => new Date(b.date) - new Date(a.date));
  res.json(tx);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
