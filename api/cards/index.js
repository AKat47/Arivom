const connectDB = require('../lib/db');
const Card      = require('../lib/Card');

module.exports = async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const filter = req.query.category ? { category: req.query.category } : {};
    const cards  = await Card.find(filter).sort({ createdAt: 1 });
    return res.json(cards);
  }

  if (req.method === 'POST') {
    try {
      const card = await Card.create(req.body);
      return res.status(201).json(card);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
