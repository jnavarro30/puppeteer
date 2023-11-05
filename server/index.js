import express from "express";
import "dotenv/config";
import cors from "cors";
import run from "./puppeteer.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/html", async (req, res) => {
  let html = await run();
  res.status(200).send({ html });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
