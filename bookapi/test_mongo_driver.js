const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb://127.0.0.1:27017/Books";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("Books");
    const collection = db.collection("test_intsert");
    const result = await collection.insertOne({ test: 123 });
    console.log("Insert success:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
