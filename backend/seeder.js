const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Event = require("./models/Event");

const events = [
  {
    title: "Neon Nights Music Festival",
    description: "An electrifying night of live music featuring top artists across genres. Expect jaw-dropping light shows, immersive sound systems, and a crowd that lives for the music.",
    date: "2026-10-24",
    location: "Mumbai",
    price: 1999,
    totalSeats: 5000,
    availableSeats: 3200,
    category: "Music",
  },
  {
    title: "Future AI Summit '26",
    description: "The biggest tech gathering of the year. Industry pioneers, live demos, keynote speakers from top AI companies, and hands-on workshops that push the boundaries of what's possible.",
    date: "2026-11-12",
    location: "Bangalore",
    price: 4500,
    totalSeats: 2500,
    availableSeats: 900,
    category: "Technical",
  },
  {
    title: "Valorant Pro League Finals",
    description: "The most prestigious esports tournament of the season. Watch the top 8 teams battle it out on the grand stage for the championship title and a ₹50L prize pool.",
    date: "2026-12-01",
    location: "Delhi",
    price: 999,
    totalSeats: 10000,
    availableSeats: 7500,
    category: "Sports",
  },
  {
    title: "Startup Pitch Battle",
    description: "50 curated startups. 5 VC judges. One winner. Watch the most disruptive ideas of 2026 compete for seed funding in this high-energy pitch competition.",
    date: "2026-11-28",
    location: "Hyderabad",
    price: 699,
    totalSeats: 800,
    availableSeats: 400,
    category: "Technical",
  },
  {
    title: "Classical Ragas Under the Stars",
    description: "An enchanting evening of Indian classical music performed by maestros in an open-air amphitheatre. A transcendent cultural experience for lovers of tradition.",
    date: "2026-10-10",
    location: "Jaipur",
    price: 1200,
    totalSeats: 1500,
    availableSeats: 600,
    category: "Cultural",
  },
  {
    title: "Mumbai Marathon 2026",
    description: "India's most iconic marathon — 42km of pure grit. Run through the heart of Mumbai with thousands of fellow athletes, with water stations and cheer zones every 5km.",
    date: "2027-01-15",
    location: "Mumbai",
    price: 1500,
    totalSeats: 15000,
    availableSeats: 9800,
    category: "Sports",
  },
  {
    title: "BlockChain India Conference",
    description: "Three days of deep-dive sessions on Web3, DeFi, NFTs, and the decentralized future. Network with developers, investors, and thought leaders shaping the digital economy.",
    date: "2026-12-10",
    location: "Pune",
    price: 3200,
    totalSeats: 1800,
    availableSeats: 1100,
    category: "Technical",
  },
  {
    title: "Desert Vibes Open Air",
    description: "Camp under the stars at this 3-day open-air festival in the Thar desert. Electronic music, art installations, yoga at sunrise, and gourmet food — the ultimate experience.",
    date: "2027-02-20",
    location: "Jaisalmer",
    price: 5500,
    totalSeats: 2000,
    availableSeats: 750,
    category: "Music",
  },
  {
    title: "National Kabaddi Championship",
    description: "The top 16 state teams compete in a 4-day national kabaddi championship. Raw power, lightning reflexes, and tactical brilliance on the mat.",
    date: "2026-11-05",
    location: "Chennai",
    price: 299,
    totalSeats: 8000,
    availableSeats: 6000,
    category: "Sports",
  },
  {
    title: "Diwali Cultural Extravaganza",
    description: "A grand celebration of India's diverse art forms — classical dance, folk music, puppet shows, and a stunning fireworks display. Celebrate the festival of lights in grandeur.",
    date: "2026-10-29",
    location: "Ahmedabad",
    price: 799,
    totalSeats: 4000,
    availableSeats: 2800,
    category: "Cultural",
  },
  {
    title: "Comedy Chaos Live",
    description: "India's top 10 stand-up comedians take the stage for one legendary night. Expect 3 hours of non-stop laughter with no filter. Adults only — 18+.",
    date: "2026-11-22",
    location: "Bangalore",
    price: 1499,
    totalSeats: 1200,
    availableSeats: 450,
    category: "Entertainment",
  },
  {
    title: "Fashion Week India '26",
    description: "The most glamorous event on the Indian fashion calendar. 40 designers, 3 runway shows per day, and exclusive access to the after-party gala with top models and designers.",
    date: "2026-10-18",
    location: "Mumbai",
    price: 8000,
    totalSeats: 600,
    availableSeats: 200,
    category: "Cultural",
  },
  {
    title: "Indie Film Festival",
    description: "Celebrating independent cinema across 72 hours of screenings, panel discussions with directors, and awards for the best films from across the country.",
    date: "2026-12-15",
    location: "Kolkata",
    price: 600,
    totalSeats: 1000,
    availableSeats: 850,
    category: "Entertainment",
  },
  {
    title: "DevFest India 2026",
    description: "Google's flagship developer festival returns to India. Sessions on Android, Flutter, Firebase, Cloud, and AI/ML — plus hackathons and community meetups.",
    date: "2026-11-30",
    location: "Bangalore",
    price: 0,
    totalSeats: 3000,
    availableSeats: 2100,
    category: "Technical",
  },
  {
    title: "The Sufi Night",
    description: "An intimate evening of Sufi music and poetry by renowned artists from Rajasthan and Pakistan. Candlelit ambience, qawwali, ghazals, and transcendence.",
    date: "2026-12-20",
    location: "Delhi",
    price: 2200,
    totalSeats: 800,
    availableSeats: 320,
    category: "Music",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Event.deleteMany({});
    console.log("🗑️  Cleared existing events");

    await Event.insertMany(events);
    console.log(`🌱 Seeded ${events.length} events successfully!`);

    mongoose.connection.close();
    console.log("👋 Connection closed");
  } catch (err) {
    console.error("❌ Seeder error:", err.message);
    process.exit(1);
  }
}

seed();
