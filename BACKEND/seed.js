import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HijabStyle from './models/HijabStyle.js';

dotenv.config();

const seedHijabs = [
  {
    name: "Elegant Chiffon Hijab",
    description: "Lightweight chiffon hijab perfect for summer. Features beautiful embroidery and comes in multiple colors.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyaGSfq7EIHIBeBil8JeVqF-fBJxP3dg0Ng&s",
    price: "$25.99",
    category: "chiffon",
    averageRating: 4.5,
    reviewCount: 12
  },
  {
    name: "Premium Silk Hijab",
    description: "Luxurious silk hijab with elegant draping. Perfect for special occasions and formal events.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZIvUnendWYofNgRB6myASjAR6T9HL-ijZmg&s",
    price: "$45.99",
    category: "silk",
    averageRating: 4.8,
    reviewCount: 8
  },
  {
    name: "Cotton Jersey Hijab",
    description: "Comfortable cotton jersey hijab for everyday wear. Breathable fabric with perfect stretch.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcrIDzGxPIjeZRX26OXfU82FKTdnFjuInZHQ&s",
    price: "$19.99",
    category: "cotton",
    averageRating: 4.3,
    reviewCount: 15
  },
  {
    name: "Lace Trimmed Hijab",
    description: "Beautiful lace trimmed hijab that adds elegance to any outfit. Available in soft pastel colors.",
    image: "https://m.media-amazon.com/images/I/61NoEfr56rL._AC_SL1200_.jpg",
    price: "$29.99",
    category: "lace",
    averageRating: 4.6,
    reviewCount: 10
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hijab-gallery');
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await HijabStyle.deleteMany({});
    console.log('Cleared existing hijabs');
    
    // Insert seed data
    await HijabStyle.insertMany(seedHijabs);
    console.log('Seed data inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
