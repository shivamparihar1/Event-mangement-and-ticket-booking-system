require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect DB
connectDB();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});