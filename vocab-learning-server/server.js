import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import mongoose from "mongoose";
import vocabularyRouter from "./src/vocabulary/vocabulary.router.js";
import FolderRouter from "./src/folder/folder.router.js";

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;
const app = express();

// connect database
mongoose
  .connect(DB_URI)
  .then((result) => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Connection error ");
  });

// middleware 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  // Thêm tiêu đề CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  next(); 
});
 
// routes
app.use("/api/vocabulary", vocabularyRouter);
app.use("/api/folder", FolderRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
