import express from "express";
import cors from "cors";
import "dotenv/config";

const app = new express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Jai Shree Ram!");
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
