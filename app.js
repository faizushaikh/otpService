const express = require('express');
const app = express();
const route = require('./router/otpRoute');
const db = require('./db/dbConnection');

// Define an async function to start the app
const startApp = async () => {
    // Wait for MongoDB connection to succeed
    const port = 3000
    await db();

    // If connection is successful, start the server
    app.use(express.json());
    app.use('/', route);

    app.listen(port, () => {
      console.log(`App started and connected to MongoDB on port ${port}`);
    });

  
};

// Call the async function to start the app
startApp();
