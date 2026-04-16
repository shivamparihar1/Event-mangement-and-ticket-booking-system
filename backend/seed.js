const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");

dotenv.config();

const categories = [
  { 
    name: "Technical", 
    titles: ["Tech Innovators Summit", "Hackathon Pro", "AI in Business", "Web3 Developer Meetup"],
    images: ["1518770660439-4636190af475", "1498050108023-c5249f4df085", "1504384308090-c894fdcc538d", "1519389950473-47ba0277781c", "1550751827-4bd374c3f58b"] 
  },
  { 
    name: "Cultural", 
    titles: ["Annual Art Fest", "Folk Dance Night", "Cultural Exchange", "Heritage Walk"],
    images: ["1459749411175-04bf5292ceea", "1514525253161-7a46d19cd819", "1533174072545-7a4b6ad7a6c3", "1563841930606-67e2bce48b78", "1464366400600-7168b8af9bc3"]
  },
  { 
    name: "Sports", 
    titles: ["Marathon 2026", "Inter-City Football", "Badminton Championship", "Yoga Athletic Meet"],
    images: ["1461896836934-ffe607ba8211", "1517649763962-0c623066013b", "1526628953301-3e589a6a8b74", "1534438327276-14e5300c3a48", "1551266188-752a7818e1ef"]
  },
  { 
    name: "Workshop", 
    titles: ["Pottery for Beginners", "Creative Writing Masterclass", "Digital Marketing Bootcamp", "DIY Electronics"],
    images: ["1531482615713-2afd69097998", "1544531586-fde5298cdd40", "1522202176988-66273c2fd55f", "1524178232363-1fb2b075b655", "1517048676732-d65bc937f952"]
  },
  { 
    name: "Seminar", 
    titles: ["Future of Finance", "Climate Change Action", "Leadership Summit", "Psychology of Success"],
    images: ["1475721025512-6a5a1f6a45fc", "1540575467063-178a50c2df87", "1505373877841-8d25f7d46678", "1558403194-611308249627", "1561489422-45de3d015e3e"]
  },
  { 
    name: "Music", 
    titles: ["Jazz Night Live", "Rock Festival", "Classical Symphony", "Indie Music Showcase"],
    images: ["1470225620780-dba8ba36b745", "1511671782779-c97d3d27a1d4", "1493225457124-a1a2a5f5f9af", "1501612780327-45045538702b", "1459749411175-04bf5292ceea"]
  },
  { 
    name: "Business", 
    titles: ["Startup Pitch Night", "Networking Mixer", "E-commerce Trends", "Women in Business"],
    images: ["1507679622140-62ce534336aa", "1556761175-5973dc0f32e7", "1542744173-8e7e53415bb0", "1454165804606-c3d57bc86b40", "1515187029135-18ee286d815b"]
  },
  { 
    name: "Health", 
    titles: ["Mindfulness Retreat", "Nutrition Workshop", "Mental Health Seminar", "Fitness Challenge"],
    images: ["1544367567-0f2fcb009e0b", "1571019614242-c5c5dee9f50b", "1505576399279-565b52d4ac71", "1494597564530-871f2b93ac55", "1538805060514-97d9cc17730c"]
  },
  { 
    name: "Food", 
    titles: ["Food Truck Festival", "Wine & Cheese Tasting", "Vegan Cooking Class", "Baking Masterclass"],
    images: ["1414235077428-9711555e7dc5", "1504674900247-0877df9cc836", "1555396273-367ea4eb4db5", "1565299624946-b28f40a0ae38", "1536304929831-ee1ca9d44906"]
  }, 
];

const cities = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata"];

const generateRandomData = () => {
    let events = [];
    
    for (const category of categories) {
        for (let i = 0; i < 20; i++) {
            const randomTitle = category.titles[Math.floor(Math.random() * category.titles.length)] + " " + (i + 1);
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            
            const date = new Date();
            date.setDate(date.getDate() + Math.floor(Math.random() * 60) + 1);
            const dateStr = date.toISOString().split('T')[0];
            
            const totalSeats = Math.floor(Math.random() * 400) + 50;
            const price = Math.floor(Math.random() * 20) * 100 + 499;
            
            // Cycle through the 5 hand-picked, guaranteed Unsplash images for this specific category
            const imageId = category.images[i % category.images.length];
            const imageUrl = `https://images.unsplash.com/photo-${imageId}?w=800&auto=format&fit=crop&q=80`;
            
            events.push({
                title: randomTitle,
                description: `Join us for the most exciting ${category.name.toLowerCase()} event in ${randomCity}. This is an amazing opportunity to connect, learn, and grow with experts and enthusiasts!`,
                date: dateStr,
                location: `${randomCity}, India`,
                price: price,
                totalSeats: totalSeats,
                availableSeats: totalSeats,
                category: category.name,
                image: imageUrl,
                createdBy: "admin"
            });
        }
    }
    
    return events;
};

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eventsphere");
        console.log("MongoDB Connected for seeding.");
        
        await Event.deleteMany({});
        console.log("Old events cleared.");
        
        const dummyEvents = generateRandomData();
        await Event.insertMany(dummyEvents);
        console.log(`Successfully seeded ${dummyEvents.length} events with ROBUST category-matching images.`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding DB:", error);
        process.exit(1);
    }
}

seedDB();
