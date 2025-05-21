import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/UserRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import http from "http";
import { Server } from "socket.io";
dotenv.config();
// app config
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});
//connect to socket
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);

  socket.on("private_message", ({ sender, receiver, content }) => {
    io.to(receiver).emit("private_message", { sender, content });
  });

  socket.on("register", (username) => {
    socket.join(username);
  });

  socket.on("disconnect", () => {
    //console.log("User disconnected:", socket.id);
  });
});

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
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

server.listen(port, () => {
  console.log("Server and Socket.IO running on port", process.env.PORT || 4000);
});
