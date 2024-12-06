// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = process.env.MONOGO_URI ||
//   "mongodb+srv://chiranthrajuc:y9wqkxww5LaJfAXX@cluster0.svkoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
import mongoos from "mongoose";

const ConnectDB = async () => {
  mongoos.connection.on("connected", () => {
    console.log(
      `Click here to access Database connected: ${process.env.MONGO_URI}`
    );
  });
  await mongoos.connect(`${process.env.MONGO_URI}/vocalize`);
};

export default ConnectDB;
