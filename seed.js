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

  // ── New cards ────────────────────────────────────────────────────────────────

  {
    topic: 'வாரநாட்கள்',
    subtitle: 'Days of the Week',
    category: 'காலம்',
    content: [
      { label: 'ஞாயிறு',   sub: 'Sunday' },
      { label: 'திங்கள்',   sub: 'Monday' },
      { label: 'செவ்வாய்', sub: 'Tuesday' },
      { label: 'புதன்',     sub: 'Wednesday' },
      { label: 'வியாழன்',  sub: 'Thursday' },
      { label: 'வெள்ளி',   sub: 'Friday' },
      { label: 'சனி',       sub: 'Saturday' },
    ],
  },
  {
    topic: 'தமிழ் எண்கள்',
    subtitle: 'Numbers 1 – 10 in Tamil',
    category: 'மொழி',
    content: [
      { label: 'ஒன்று',    sub: '1' },
      { label: 'இரண்டு',  sub: '2' },
      { label: 'மூன்று',   sub: '3' },
      { label: 'நான்கு',  sub: '4' },
      { label: 'ஐந்து',   sub: '5' },
      { label: 'ஆறு',      sub: '6' },
      { label: 'ஏழு',      sub: '7' },
      { label: 'எட்டு',   sub: '8' },
      { label: 'ஒன்பது', sub: '9' },
      { label: 'பத்து',   sub: '10' },
    ],
  },
  {
    topic: 'நிறங்கள்',
    subtitle: 'Colours in Tamil',
    category: 'மொழி',
    content: [
      { label: 'சிவப்பு',   sub: 'Red' },
      { label: 'நீலம்',     sub: 'Blue' },
      { label: 'பச்சை',    sub: 'Green' },
      { label: 'மஞ்சள்',   sub: 'Yellow' },
      { label: 'வெள்ளை',  sub: 'White' },
      { label: 'கருப்பு',  sub: 'Black' },
      { label: 'ஆரஞ்சு',  sub: 'Orange' },
      { label: 'இளஞ்சிவப்பு', sub: 'Pink' },
      { label: 'ஊதா',      sub: 'Purple' },
      { label: 'பழுப்பு',  sub: 'Brown' },
    ],
  },
  {
    topic: 'உயிரெழுத்துக்கள்',
    subtitle: 'Tamil Vowels (12)',
    category: 'மொழி',
    content: [
      { label: 'அ', sub: 'a' }, { label: 'ஆ', sub: 'aa' },
      { label: 'இ', sub: 'i' }, { label: 'ஈ', sub: 'ee' },
      { label: 'உ', sub: 'u' }, { label: 'ஊ', sub: 'oo' },
      { label: 'எ', sub: 'e' }, { label: 'ஏ', sub: 'ae' },
      { label: 'ஐ', sub: 'ai' },
      { label: 'ஒ', sub: 'o' }, { label: 'ஓ', sub: 'oa' },
      { label: 'ஔ', sub: 'au' },
    ],
  },
  {
    topic: 'உடல் உறுப்புகள்',
    subtitle: 'Parts of the Body',
    category: 'அறிவியல்',
    content: [
      { label: 'தலை',           sub: 'Head' },
      { label: 'கண்',           sub: 'Eye' },
      { label: 'காது',           sub: 'Ear' },
      { label: 'மூக்கு',        sub: 'Nose' },
      { label: 'வாய்',          sub: 'Mouth' },
      { label: 'கை',            sub: 'Hand' },
      { label: 'கால்',          sub: 'Leg / Foot' },
      { label: 'விரல்',         sub: 'Finger' },
      { label: 'இதயம்',        sub: 'Heart' },
      { label: 'நுரையீரல்',    sub: 'Lungs' },
      { label: 'வயிறு',         sub: 'Stomach' },
      { label: 'மூளை',         sub: 'Brain' },
    ],
  },
  {
    topic: 'கோள்கள்',
    subtitle: 'Planets of the Solar System',
    category: 'அறிவியல்',
    content: [
      { label: 'புதன்',      sub: 'Mercury — 1st' },
      { label: 'வெள்ளி',    sub: 'Venus — 2nd' },
      { label: 'பூமி',       sub: 'Earth — 3rd' },
      { label: 'செவ்வாய்', sub: 'Mars — 4th' },
      { label: 'வியாழன்',  sub: 'Jupiter — 5th' },
      { label: 'சனி',        sub: 'Saturn — 6th' },
      { label: 'யுரேனஸ்',  sub: 'Uranus — 7th' },
      { label: 'நெப்டியூன்', sub: 'Neptune — 8th' },
    ],
  },
  {
    topic: 'பழங்கள்',
    subtitle: 'Fruits in Tamil',
    category: 'இயற்கை',
    content: [
      { label: 'மாம்பழம்',     sub: 'Mango' },
      { label: 'வாழைப்பழம்', sub: 'Banana' },
      { label: 'தேங்காய்',    sub: 'Coconut' },
      { label: 'பப்பாளி',     sub: 'Papaya' },
      { label: 'அன்னாசி',    sub: 'Pineapple' },
      { label: 'திராட்சை',   sub: 'Grapes' },
      { label: 'மாதுளை',     sub: 'Pomegranate' },
      { label: 'பலாப்பழம்', sub: 'Jackfruit' },
      { label: 'நெல்லிக்காய்', sub: 'Gooseberry' },
      { label: 'வாதுமை',     sub: 'Guava' },
    ],
  },
  {
    topic: 'காய்கறிகள்',
    subtitle: 'Vegetables in Tamil',
    category: 'இயற்கை',
    content: [
      { label: 'தக்காளி',         sub: 'Tomato' },
      { label: 'வெங்காயம்',      sub: 'Onion' },
      { label: 'உருளைக்கிழங்கு', sub: 'Potato' },
      { label: 'கத்திரிக்காய்',  sub: 'Brinjal' },
      { label: 'முருங்கைக்காய்', sub: 'Drumstick' },
      { label: 'வெண்டைக்காய்',  sub: 'Okra' },
      { label: 'பாகற்காய்',      sub: 'Bitter Gourd' },
      { label: 'பீர்க்கங்காய்',  sub: 'Ridge Gourd' },
      { label: 'கேரட்',           sub: 'Carrot' },
      { label: 'பூசணிக்காய்',    sub: 'Pumpkin' },
    ],
  },
  {
    topic: 'தமிழ்நாட்டு ஆறுகள்',
    subtitle: 'Rivers of Tamil Nadu',
    category: 'இயற்கை',
    content: [
      { label: 'காவிரி',         sub: 'Kaveri — நெல் நாடு' },
      { label: 'வைகை',          sub: 'Vaigai — மதுரை' },
      { label: 'தாமிரபரணி',    sub: 'Thamirabarani — திருநெல்வேலி' },
      { label: 'பாலாறு',        sub: 'Palar — வட தமிழகம்' },
      { label: 'பொன்னையாறு',  sub: 'Ponnaiyar — வில்லுபுரம்' },
      { label: 'வேளாறு',        sub: 'Vellar — கடலூர்' },
      { label: 'அடையாறு',      sub: 'Adyar — சென்னை' },
      { label: 'கூவம்',          sub: 'Cooum — சென்னை' },
    ],
  },
  {
    topic: 'தமிழ் வம்சங்கள்',
    subtitle: 'Tamil Dynasties',
    category: 'வரலாறு',
    content: [
      { label: 'சங்க சேரர்கள்', sub: 'Cheras — கேரளம், வ.க. 300 BCE' },
      { label: 'சங்க சோழர்கள்', sub: 'Early Cholas — உறையூர்' },
      { label: 'சங்க பாண்டியர்கள்', sub: 'Early Pandyas — மதுரை' },
      { label: 'பல்லவர்கள்',    sub: 'Pallavas — காஞ்சி, 275–897 CE' },
      { label: 'நடு கால சோழர்கள்', sub: 'Medieval Cholas — தஞ்சாவூர், 850–1279 CE' },
      { label: 'விஜயநகரம்',    sub: 'Vijayanagara — 1336–1646 CE' },
      { label: 'நாயக்கர்கள்',   sub: 'Nayaks — மதுரை, தஞ்சை, 16–18 CE' },
      { label: 'மராட்டியர்கள்', sub: 'Marathas of Thanjavur — 1674–1855 CE' },
    ],
  },
  {
    topic: 'தமிழ் நகரங்கள்',
    subtitle: 'Major Cities of Tamil Nadu',
    category: 'புவியியல்',
    content: [
      { label: 'சென்னை',      sub: 'Chennai — தலைநகர்' },
      { label: 'மதுரை',       sub: 'Madurai — கோவில் நகர்' },
      { label: 'கோயம்புத்தூர்', sub: 'Coimbatore — தொழில் நகர்' },
      { label: 'திருச்சி',    sub: 'Trichy — நடு தமிழகம்' },
      { label: 'சேலம்',       sub: 'Salem — மலை சாரல்' },
      { label: 'திருநெல்வேலி', sub: 'Tirunelveli — தென் முனை' },
      { label: 'ஈரோடு',      sub: 'Erode — நெசவு நகர்' },
      { label: 'வேலூர்',     sub: 'Vellore — கோட்டை நகர்' },
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
