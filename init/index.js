const mongoose = require('mongoose');
const initdata = require('./data.js');
const listing = require('../models/listing.js');

// connecting to MongoDB
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => { console.log("Connected to MongoDB") })
  .catch(err => { console.log("Error connecting to MongoDB:", err) });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await listing.deleteMany({});

  // Convert image object to string if needed
 const cleanedData = initdata.data.map((obj) => ({
    ...obj,
    // image: typeof obj.image === 'object' ? obj.image.url : obj.image,
    image:obj.image,
    owner: "6891e99f0277abc34f08274b"  // Added owner directly here
  }));
  await listing.insertMany(cleanedData);
  console.log("Database initialized with sample data");
};

initDB();






