// db.js
const mongoose = require('mongoose');

// MongoDB connection string (replace <dbname> with your database name)
const dbURI = 'mongodb://localhost:27017/<dbname>';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Export the connection function to use in other files
module.exports = connectDB;
