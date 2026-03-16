const mongoose = require('mongoose');

async function run() {
  try {
    await mongoose.connect('mongodb://localhost:27017/Books');
    console.log('Connected to Books');
    const admin = mongoose.connection.useDb('admin').db.admin();
    const dbs = await admin.listDatabases();
    console.log('Databases:', JSON.stringify(dbs.databases, null, 2));
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in Books:', collections.map(c => c.name));
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
