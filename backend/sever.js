import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import dotenv from "dotenv";

dotenv.config();
// app config
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// database config
connectDB();

// api endpoints
app.use("/api/food", foodRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
//mongodb+srv://trinhthinh:123456789a@@cluster0.hgchyaw.mongodb.net/?
