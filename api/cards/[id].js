const connectDB = require('../lib/db');
const Card      = require('../lib/Card');

module.exports = async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    return res.json(card);
  }

  if (req.method === 'PUT') {
    try {
      const card = await Card.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!card) return res.status(404).json({ error: 'Card not found' });
      return res.json(card);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    const card = await Card.findByIdAndDelete(id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    return res.json({ success: true, id });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
