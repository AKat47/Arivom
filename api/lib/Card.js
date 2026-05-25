const mongoose = require('mongoose');

const contentItemSchema = new mongoose.Schema(
  { label: { type: String, required: true }, sub: { type: String, default: '' } },
  { _id: false }
);

const cardSchema = new mongoose.Schema({
  topic:    { type: String, required: true, trim: true },
  subtitle: { type: String, default: '',    trim: true },
  category: { type: String, default: 'இதர', trim: true },
  content:  { type: [contentItemSchema], required: true },
}, { timestamps: true });

// Prevent model re-compilation on hot reloads
module.exports = mongoose.models.Card || mongoose.model('Card', cardSchema);
