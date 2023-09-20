const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middelware Setup
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://testuser-01:bUq68LKunln8gaT4@cluster0.xlu8zyp.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const testUserDB001 = client.db("testUserDB").collection("users");
    
    app.get('/users', async (req, res)=>{
        const result = await testUserDB001.find({}).toArray()
        res.send(result)
    })

    app.post('/users', async (req, res)=>{
        const user = req.body
        const result = await testUserDB001.insertOne(user)
        res.send(result)
    })

    // Delete
    app.delete('/users/:id', async (req, res)=>{
      const id = req.params.id 
      const query = {_id : new ObjectId(req.params.id)}
      const result = await testUserDB001.deleteOne(query)
      res.send(result)
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`The Server Running Port is ${port}`);
});
