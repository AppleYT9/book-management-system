const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    console.log("Existing DBs:", dbs.databases.map(d => d.name));
    
    // Check if Books exists
    if (dbs.databases.some(d => d.name === 'Books')) {
      console.log("Books exists. Copying to books_new...");
      // MongoDB doesn't have a simple rename. We will copy and drop.
      const oldDb = client.db('Books');
      const newDb = client.db('books_clean');
      
      const collections = await oldDb.listCollections().toArray();
      for (const col of collections) {
         console.log(`Copying collection ${col.name}...`);
         const docs = await oldDb.collection(col.name).find().toArray();
         if (docs.length > 0) {
           await newDb.collection(col.name).insertMany(docs);
         } else {
           await newDb.createCollection(col.name);
         }
      }
      console.log("Done copying. You should now use 'books_clean'.");
    } else {
      console.log("Books database not found.");
    }
    
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
