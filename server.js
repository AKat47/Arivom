require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ── Schema ────────────────────────────────────────────────────────────────────

const contentItemSchema = new mongoose.Schema(
  { label: { type: String, required: true }, sub: { type: String, default: '' } },
  { _id: false }
);

const cardSchema = new mongoose.Schema({
  topic:    { type: String, required: true, trim: true },
  subtitle: { type: String, default: '',   trim: true },
  category: { type: String, default: 'இதர', trim: true },
  content:  { type: [contentItemSchema], required: true },
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

// ── Routes ────────────────────────────────────────────────────────────────────

// GET /api/cards  — list all cards, optionally filtered by ?category=காலம்
app.get('/api/cards', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const cards  = await Card.find(filter).sort({ createdAt: 1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/cards/categories — distinct category list
app.get('/api/cards/categories', async (req, res) => {
  try {
    const cats = await Card.distinct('category');
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/cards/:id — single card
app.get('/api/cards/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cards — create a new card
// Body: { topic, subtitle?, category?, content: [{ label, sub? }] }
app.post('/api/cards', async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/cards/:id — update an existing card
app.put('/api/cards/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/cards/:id — remove a card
app.delete('/api/cards/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
