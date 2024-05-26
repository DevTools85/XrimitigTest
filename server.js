const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

app.get('/', async (req, res) => {
  const uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + encodeURIComponent(process.env.MONGO_PASSWORD) + "@cluster0.miqtm7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    res.json({ message: "Pinged your deployment. You successfully connected to MongoDB!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while connecting to MongoDB." });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
