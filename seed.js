/**
 * seed.js — populates MongoDB with the pre-loaded Tamil flashcards.
 * Run once:  node seed.js
 * Safe to re-run — skips cards whose topic already exists.
 */

require('dotenv').config();
const mongoose = require('mongoose');

const contentItemSchema = new mongoose.Schema(
  { label: { type: String, required: true }, sub: { type: String, default: '' } },
  { _id: false }
);

const cardSchema = new mongoose.Schema({
  topic:    { type: String, required: true, trim: true },
  subtitle: { type: String, default: '' },
  category: { type: String, default: 'இதர' },
  content:  { type: [contentItemSchema], required: true },
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

// ── Seed data ────────────────────────────────────────────────────────────────

const SEED_CARDS = [
  {
    topic: 'தமிழ் மாதங்கள்',
    subtitle: 'Tamil Calendar Months',
    category: 'காலம்',
    content: [
      { label: 'சித்திரை',   sub: 'Apr – May' },
      { label: 'வைகாசி',    sub: 'May – Jun' },
      { label: 'ஆனி',       sub: 'Jun – Jul' },
      { label: 'ஆடி',       sub: 'Jul – Aug' },
      { label: 'ஆவணி',     sub: 'Aug – Sep' },
      { label: 'புரட்டாசி', sub: 'Sep – Oct' },
      { label: 'ஐப்பசி',    sub: 'Oct – Nov' },
      { label: 'கார்த்திகை', sub: 'Nov – Dec' },
      { label: 'மார்கழி',   sub: 'Dec – Jan' },
      { label: 'தை',        sub: 'Jan – Feb' },
      { label: 'மாசி',      sub: 'Feb – Mar' },
      { label: 'பங்குனி',   sub: 'Mar – Apr' },
    ],
  },
  {
    topic: 'ஆங்கில மாதங்கள்',
    subtitle: 'English Months in Tamil',
    category: 'காலம்',
    content: [
      { label: 'ஜனவரி' }, { label: 'பிப்ரவரி' }, { label: 'மார்ச்' },
      { label: 'ஏப்ரல்' }, { label: 'மே' }, { label: 'ஜூன்' },
      { label: 'ஜூலை' }, { label: 'ஆகஸ்ட்' }, { label: 'செப்டம்பர்' },
      { label: 'அக்டோபர்' }, { label: 'நவம்பர்' }, { label: 'டிசம்பர்' },
    ],
  },
  {
    topic: 'தமிழ் பருவகாலங்கள்',
    subtitle: '6 Seasons of Tamil Tradition',
    category: 'காலம்',
    content: [
      { label: 'இளவேனில்',   sub: 'Early Spring — சித்திரை-வைகாசி' },
      { label: 'முதுவேனில்',  sub: 'Late Summer — ஆனி-ஆடி' },
      { label: 'கார்',        sub: 'Monsoon — ஆவணி-புரட்டாசி' },
      { label: 'கூதிர்',      sub: 'Autumn — ஐப்பசி-கார்த்திகை' },
      { label: 'முன்பனி',    sub: 'Early Winter — மார்கழி-தை' },
      { label: 'பின்பனி',    sub: 'Late Winter — மாசி-பங்குனி' },
    ],
  },
  {
    topic: 'மண் வகைகள்',
    subtitle: 'Types of Soil',
    category: 'இயற்கை',
    content: [
      { label: 'வண்டல் மண்',     sub: 'Alluvial — ஆறு படிவு, மிகவும் வளமான' },
      { label: 'கரிசல் மண்',     sub: 'Black Cotton — அதிக களிமண், நீர் தேக்கும்' },
      { label: 'செம்மண்',        sub: 'Red Laterite — இரும்புச்சத்து, தமிழகம்' },
      { label: 'மணல் மண்',       sub: 'Sandy — நீர் வடிகால் அதிகம்' },
      { label: 'களிமண்',         sub: 'Clay — நீர் தேக்கும், பிசுக்கான' },
      { label: 'லேட்டரைட் மண்',  sub: 'Laterite — மழைக்காட்டு பகுதி' },
      { label: 'உப்பு மண்',      sub: 'Saline — கடலோரம், தாவரம் வளராது' },
      { label: 'கரும் மண்',      sub: 'Peaty — சேதன பொருள் நிறைந்த' },
    ],
  },
  {
    topic: 'தமிழ் திணைகள்',
    subtitle: '5 Landscape Types — Sangam Literature',
    category: 'புவியியல்',
    content: [
      { label: 'குறிஞ்சி', sub: 'மலை — Mountains & Hill ranges' },
      { label: 'முல்லை',  sub: 'காடு — Forests & Pastoral land' },
      { label: 'மருதம்',  sub: 'சமவெளி — Plains & Farmland' },
      { label: 'நெய்தல்', sub: 'கடல் — Coastal & Seashore' },
      { label: 'பாலை',    sub: 'வெட்டவெளி — Arid & Desert' },
    ],
  },
  {
    topic: 'நிலப் பரப்பு வகைகள்',
    subtitle: 'Types of Landforms',
    category: 'புவியியல்',
    content: [
      { label: 'மலை',          sub: 'Mountain — உயரமான நிலம்' },
      { label: 'குன்று',        sub: 'Hill — சிறிய மலை' },
      { label: 'சமவெளி',      sub: 'Plain — தட்டையான நிலம்' },
      { label: 'பீடபூமி',     sub: 'Plateau — மேட்டு நிலம்' },
      { label: 'பள்ளத்தாக்கு', sub: 'Valley — மலைகளுக்கு இடையே' },
      { label: 'டெல்டா',       sub: 'Delta — ஆற்று முகத்துவாரம்' },
      { label: 'துவீபம்',      sub: 'Island — நீரால் சூழ்ந்த நிலம்' },
      { label: 'குடா நாடு',    sub: 'Peninsula — மூன்று பக்கம் கடல்' },
      { label: 'முனம்',        sub: 'Cape — கடலில் நீண்ட நிலம்' },
    ],
  },
];

// ── Run ───────────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB Atlas');

  let inserted = 0;
  let skipped  = 0;

  for (const data of SEED_CARDS) {
    const exists = await Card.findOne({ topic: data.topic });
    if (exists) {
      console.log(`  ⏭  Skipped  "${data.topic}" (already exists)`);
      skipped++;
    } else {
      await Card.create(data);
      console.log(`  ✚  Inserted "${data.topic}"`);
      inserted++;
    }
  }

  console.log(`\nDone — ${inserted} inserted, ${skipped} skipped.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
