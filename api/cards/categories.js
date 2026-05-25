const connectDB = require('../lib/db');
const Card      = require('../lib/Card');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  await connectDB();
  const cats = await Card.distinct('category');
  res.json(cats);
};
