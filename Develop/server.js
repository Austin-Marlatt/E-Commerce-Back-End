// File that initializes the application

// Module used to create an Express application
const express = require('express');

// Import the root folder of our routes
const routes = require('./routes');
// Import the connection to the database
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passing the routes as middleware
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => { console.log(`App listening at http://localhost:${PORT}/`)});
});
