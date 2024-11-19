require('module-alias/register');
const mongoose = require('mongoose');
const { globSync } = require('glob');
const path = require('path');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 20) {
  console.log('Please upgrade your node.js version to at least 20 or greater. 👌');
  process.exit();
}

// Import environmental variables
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

// Set up Mongoose connection
mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection established successfully!');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected!');
});

// Load models dynamically
const modelsFiles = globSync('./src/models/**/*.js');
for (const filePath of modelsFiles) {
  require(path.resolve(filePath));
}

// Start our app
const app = require('./app');
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});
