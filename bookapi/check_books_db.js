const mongoose = require('mongoose');

async function run() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Books');
    console.log('Connected to Books');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    for (const col of collections) {
      const docs = await mongoose.connection.db.collection(col.name).find().toArray();
      console.log(`Docs in ${col.name}:`, JSON.stringify(docs, null, 2));
    }
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
