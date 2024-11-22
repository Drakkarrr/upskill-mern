require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const { glob } = require('glob'); // Use async glob
const fs = require('fs').promises; // Use async fs
const { generate: uniqueId } = require('shortid');
const mongoose = require('mongoose');

// Establish MongoDB connection with better error handling
mongoose.connect(process.env.DATABASE).catch((error) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1); // Exit on connection failure
});

mongoose.connection.once('open', async () => {
  console.log('MongoDB connected successfully!');
  await setupApp(); // Only proceed with setup once connected
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1); // Exit on connection error
});

// Async function to perform setup
async function setupApp() {
  try {
    // Import models
    const Admin = require('../models/coreModels/Admin');
    const AdminPassword = require('../models/coreModels/AdminPassword');
    const Setting = require('../models/coreModels/Setting');
    const PaymentMode = require('../models/appModels/PaymentMode');
    const Taxes = require('../models/appModels/Taxes');

    const newAdminPassword = new AdminPassword();
    const salt = uniqueId();
    const passwordHash = newAdminPassword.generateHash(salt, 'admin123');

    const demoAdmin = {
      email: 'aloha@recamadas.com',
      name: 'Drakkar',
      surname: 'Admin',
      enabled: true,
      role: 'owner',
    };
    const result = await new Admin(demoAdmin).save();

    const AdminPasswordData = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: result._id,
    };
    await new AdminPassword(AdminPasswordData).save();

    console.log('👍 Admin created : Done!');

    // Read settings files
    const settingFiles = [];
    const settingsFiles = await glob('./src/setup/defaultSettings/**/*.json'); // Async glob

    for (const filePath of settingsFiles) {
      const file = JSON.parse(await fs.readFile(filePath, 'utf-8')); // Async readFile
      settingFiles.push(...file);
    }

    // Insert settings into database
    await Setting.insertMany(settingFiles);

    console.log('👍 Settings created : Done!');

    // Insert default taxes
    await Taxes.insertMany([{ taxName: 'Tax 0%', taxValue: '0', isDefault: true }]);
    console.log('👍 Taxes created : Done!');

    // Insert default payment modes
    await PaymentMode.insertMany([
      {
        name: 'Default Payment',
        description: 'Default Payment Mode (Cash, Wire Transfer)',
        isDefault: true,
      },
    ]);
    console.log('👍 PaymentMode created : Done!');

    console.log('🥳 Setup completed : Success!');
    process.exit();
  } catch (e) {
    console.log('\n🚫 Error! The Error info is below');
    console.log(e);
    process.exit(1); // Exit with failure code on error
  }
}
