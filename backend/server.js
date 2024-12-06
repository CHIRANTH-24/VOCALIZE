import express from "express";
import cors from "cors";
import "dotenv/config";

import ConnectDB from "./config/mogo.js"

const app = new express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());


ConnectDB();

app.get("/", (req, res) => {
  return res.send("Jai Shree Ram!");
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
